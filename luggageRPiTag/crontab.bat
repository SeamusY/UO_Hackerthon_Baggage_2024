#!/bin/bash

# Path to the Python script
SCRIPT_PATH="./main.py"

# Add the cron job to the crontab
(crontab -l 2>/dev/null; echo "@reboot python3 $SCRIPT_PATH &") | crontab -

# echo "Cron job added to run main.py at startup."
sudo reboot