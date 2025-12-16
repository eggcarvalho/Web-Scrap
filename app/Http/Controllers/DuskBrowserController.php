<?php

namespace App\Http\Controllers;

use Facebook\WebDriver\Chrome\ChromeOptions;
use Facebook\WebDriver\Exception\NoSuchElementException;
use Facebook\WebDriver\Interactions\Internal\WebDriverMouseMoveAction;
use Facebook\WebDriver\Interactions\WebDriverActions;
use Facebook\WebDriver\Remote\DesiredCapabilities;
use Facebook\WebDriver\Remote\RemoteWebDriver;
use Facebook\WebDriver\WebDriverBy;
use Illuminate\Http\Request;

class DuskBrowserController extends Controller
{

    private RemoteWebDriver $driver;

    public function __construct()
    {
        $this->driver = $this->driver();
    }

    public function init(string $url)
    {
        $this->driver->get($url);
    }

    private function driver()
    {
        $options = (new ChromeOptions)->addArguments(
            [
                '--window-size=1024,768',
                '--proxy-server=http://162.240.154.26:80',
                '--disable-blink-features=AutomationControlled',
                '--disable-infobars',
                '--no-sandbox',
                '--disable-dev-shm-usage',
                '--disable-extensions',
                '--disable-gpu',
                '--user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',

            ]
        );


        return RemoteWebDriver::create(
            'http://192.168.128.7:4444',
            DesiredCapabilities::chrome()->setCapability(ChromeOptions::CAPABILITY, $options)
        );
    }

    public function fillFields()
    {
        $actions = new WebDriverActions($this->driver);

        try {
            $this->driver->findElement(
                WebDriverBy::cssSelector('.ray-id')
            );
            $exists = true;
        } catch (NoSuchElementException $e) {
            $exists = false;
        }


        // if ($exists) {
        //     new WebDriverMouseMoveAction()
        //     $actions
        //         ->moveByOffset(100, 150)
        //         ->click()
        //         ->perform();
        // }
    }

    public function quit()
    {
        sleep(5);

        $this->driver->quit();
    }
}
