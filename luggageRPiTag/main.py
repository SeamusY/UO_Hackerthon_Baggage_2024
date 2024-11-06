import requests
import time
import uuid
import RPi.GPIO as GPIO
from datetime import datetime, timedelta

domain = "http://localhost:8080"  # Will point to Intranet server

# GPIO pin configuration
RED_PIN = 17
GREEN_PIN = 27
FLASH = {
    'seconds':10,
    "delay": 0.5,  # Delay between lightbulb on and off
}
# Setup GPIO mode
GPIO.setmode(GPIO.BCM)
GPIO.setup(RED_PIN, GPIO.OUT)
GPIO.setup(GREEN_PIN, GPIO.OUT)


# Get the UUID of the Raspberry Pi
def get_pin_id():
    return str(uuid.getnode())  # Get the MAC address as a unique identifier


def get_colour():
    try:
        response = requests.get(f"{domain}/pincolor?pinid={get_pin_id()}")
        response.raise_for_status()  # Raise an error for bad responses (4xx or 5xx)
        return response.json().get(
            "color", "error"
        )  # Expecting a color in one in  ["red", "green", "yellow", "error"]

    except requests.exceptions.RequestException as e:
        return "error"  # Return "error" to indicate a failure


def set_color(color):
    # Turn off all colors initially
    GPIO.output(RED_PIN, GPIO.LOW)
    GPIO.output(GREEN_PIN, GPIO.LOW)
    # Set color based on the response
    if color == "red":
        GPIO.output(RED_PIN, GPIO.HIGH)
    elif color == "green":
        GPIO.output(GREEN_PIN, GPIO.HIGH)
    elif color == "yellow":
        GPIO.output(RED_PIN, GPIO.HIGH)
        GPIO.output(GREEN_PIN, GPIO.HIGH)


def flash_red(total_seconds):
    end_time = datetime.now() + timedelta(seconds=total_seconds)
    while datetime.now() < end_time:
        GPIO.output(RED_PIN, GPIO.HIGH)
        time.sleep(FLASH.delay)
        GPIO.output(RED_PIN, GPIO.LOW)
        time.sleep(FLASH.delay)


def get_colour_delay_period():
    # As an improvement
    # Delay period can be dynamically adjusted (reduced when close to EOBT) in accordance to time till EOBT
    # Default is set to 60 seconds
    return 60 # seconds


# Example usage
if __name__ == "__main__":
    try:
        while True:
            color = get_colour()
            if color == "error":
                flash_red(FLASH.seconds)  # Flash red on error
            else:
                set_color(color)  # Set the color of the LED
                time.sleep(get_colour_delay_period())
    except KeyboardInterrupt:
        pass
    finally:
        GPIO.cleanup()  # Clean up GPIO on exit
