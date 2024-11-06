import requests
import time
import uuid
import RPi.GPIO as GPIO

domain = "http://localhost:8080"  # Will point to Intranet server

# GPIO pin configuration
RED_PIN = 17
GREEN_PIN = 27

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
        return response.color  # Expecting a color in one in  ["red", "green", "yellow"]

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


def flash_red(times=5, delay=1):
    for _ in range(times):
        GPIO.output(RED_PIN, GPIO.HIGH)
        time.sleep(delay)
        GPIO.output(RED_PIN, GPIO.LOW)
        time.sleep(delay)


# Example usage
if __name__ == "__main__":
    try:
        while True:
            color = get_colour()
            if color == "error":
                flash_red()  # Flash red on error
            else:
                set_color(color)  # Set the color of the LED

            time.sleep(10)  # Wait for 10 seconds
    except KeyboardInterrupt:
        pass
    finally:
        GPIO.cleanup()  # Clean up GPIO on exit
