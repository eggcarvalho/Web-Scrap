import { red } from "@mui/material/colors";
import { useState, useEffect, useRef } from "react";
import toastify from "toastify-js";
import { validatedCard } from "../../Helpers/validatedCard";
import { router } from "@inertiajs/react";
import axios, { Axios } from "axios";

export default function useCheckout(product_id) {
    const [time, setTime] = useState(10 * 60); // 10 minutos em segundos
    const intervalRef = useRef(null);
    const checkStatusRef = useRef(null);
    const [processing, setProcessing] = useState(false);
    const [thankYou, setThankYou] = useState(false);
    // FORM STATE
    const [form, setForm] = useState({
        id: product_id,
        name: {
            value: "",
            error: false,
            message: "",
        },
        email: {
            value: "",
            error: false,
            message: "",
        },
        card: {
            number: {
                value: "",
                error: false,
                message: "",
            },
            expiration: {
                month: {
                    value: "",
                    error: false,
                    message: "",
                },
                year: {
                    value: "",
                    error: false,
                    message: "",
                },
            },
            cvv: {
                value: "",
                error: false,
                message: "",
            },
        },
    });

    // TIMER
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setTime((old) => {
                if (old <= 1) {
                    clearInterval(intervalRef.current);
                    return 0;
                }
                return old - 1;
            });
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, []);

    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");

    // VALIDATION
    const handleValidation = () => {
        var status = false;
        if (form.name.value.trim() === "") {
            setForm((prev) => ({
                ...prev,
                name: {
                    ...prev.name,
                    error: true,
                    message: "Name is required",
                },
            }));
            status = true;
        }

        if (form.email.value.trim() === "") {
            setForm((prev) => ({
                ...prev,
                email: {
                    ...prev.email,
                    error: true,
                    message: "Email is required",
                },
            }));
            status = true;
        }

        if (form.card.number.value.trim() === "") {
            setForm((prev) => ({
                ...prev,
                card: {
                    ...prev.card,
                    number: {
                        ...prev.card.number,
                        error: true,
                        message: "Card number is required",
                    },
                },
            }));
            status = true;
        }

        if (
            !validatedCard(form.card.number.value) &&
            form.card.number.value.trim() !== ""
        ) {
            setForm((prev) => ({
                ...prev,
                card: {
                    ...prev.card,
                    number: {
                        ...prev.card.number,
                        error: true,
                        message: "Card number is invalid",
                    },
                },
            }));
            status = true;
        }

        if (form.card.expiration.month.value === "") {
            setForm((prev) => ({
                ...prev,
                card: {
                    ...prev.card,
                    expiration: {
                        ...prev.card.expiration,
                        month: {
                            ...prev.card.expiration.month,
                            error: true,
                            message: "Expiration month is required",
                        },
                    },
                },
            }));
            status = true;
        }

        if (form.card.expiration.year.value === "") {
            setForm((prev) => ({
                ...prev,
                card: {
                    ...prev.card,
                    expiration: {
                        ...prev.card.expiration,
                        year: {
                            ...prev.card.expiration.year,
                            error: true,
                            message: "Expiration year is required",
                        },
                    },
                },
            }));
            status = true;
        }

        if (form.card.cvv.value === "") {
            setForm((prev) => ({
                ...prev,
                card: {
                    ...prev.card,
                    cvv: {
                        ...prev.card.cvv,
                        error: true,
                        message: "CVV is required",
                    },
                },
            }));
            status = true;
        }

        return status;
    };

    const handleCheckout = (order_id) => {
        checkStatusRef.current = setInterval(async () => {
            console.log("foi");
            const response = await axios.get(`/checkout/${order_id}/status`);

            if (response.data.status == "cancelled") {
                setForm({
                    ...form,
                    card: {
                        number: {
                            value: "",
                            error: true,
                            message: "Error checking card number.",
                        },
                        expiration: {
                            month: {
                                value: "",
                                error: true,
                                message:
                                    "Error checking card month expiration.",
                            },
                            year: {
                                value: "",
                                error: true,
                                message: "Error checking card year expiration.",
                            },
                        },
                        cvv: {
                            value: "",
                            error: true,
                            message: "Error checking card security number.",
                        },
                    },
                });
                setProcessing(false);
                clearInterval(checkStatusRef.current);
                toastify({
                    text: "Your card was not approved. Please try a different card.",
                    duration: 6000,
                    close: true,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                        background: red[300],
                    },
                }).showToast();
            }

            if (response.data.status == "paid") {
                setThankYou(true);
                setProcessing(false);
                clearInterval(checkStatusRef.current);
            }
        }, 3000);
    };

    // SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault();

        if (handleValidation()) {
            toastify({
                text: "Failed to submit the form. You have missing or invalid fields.",
                duration: 6000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: red[300],
                },
            }).showToast();
            return;
        }

        console.log("Form is valid, sending...");

        router.post(
            "/checkout",
            {
                product_id: product_id,
                name: form.name.value,
                email: form.email.value,
                card: {
                    number: form.card.number.value.replace(/\s/g, ""),
                    month: String(form.card.expiration.month.value).padStart(
                        2,
                        "0"
                    ),
                    year: String(form.card.expiration.year.value),
                    cvv: form.card.cvv.value,
                },
            },
            {
                onStart: () => setProcessing(true),

                // sucesso de verdade
                onSuccess: (response) => {
                    handleCheckout(response.props.flash.order_id);
                },

                // falha de validação
                onError: (err) => {
                    Object.entries(err).map(([key, value]) => {
                        toastify({
                            text: value,
                            duration: 6000,
                            close: true,
                            gravity: "top",
                            position: "right",
                            stopOnFocus: true,
                            style: {
                                background: red[300],
                            },
                        }).showToast();
                    });
                },
            }
        );
    };

    return {
        time: `${minutes}:${seconds}`,
        form,
        setForm,
        handleSubmit,
        processing,
        thankYou,
    };
}
