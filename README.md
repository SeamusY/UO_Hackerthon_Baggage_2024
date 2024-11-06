# Cathay Hackathon 2024 - Wee Fly Repository

This repository contains the project for the **Cathay Hackathon 2024 - Wee Fly** (T0253).

## Technical Overview

The solution leverages AI to analyze historical data regarding the time required for passengers to walk from the shops and other terminal areas to specific boarding bays. By comparing this data against current passenger position using new boarding passes' RFID chip, with the time remaining until the **Estimated Off-Block Time** (EOBT) minus 5 minutes, we can calculate a **Passenger Confidence** score. This score indicates whether it is appropriate to load the baggage onto the aircraft.

## Passenger Confidence Levels

The confidence thresholds are for reference only and are rough estimations of situation. For actual scenario the threshold can be AI-fine-tuned and be changed under business requirements or SLAs.


| Passenger Confidence (%) | Baggage Status        | Baggage Handler's Action                                | Baggage LED                                 |
|--------------------------|-----------------------|--------------------------------------------------------|---------------------------------------------|
| 0 - 49.9                 | `NO LOAD`             | <u>Off-load baggage</u><br>(Due to Customs, Switched to another flight, no-show etc<br>All `WAIT TO LOAD` baggages at EOBT-5m will be automatically a `NO LOAD`)                                               | <span style="background-color: red; color: white; padding: 2px;">RED</span>      |
| 50 - 89.9                | `WAIT TO LOAD`        | <u>Wait until all `OK TO LOAD` items are loaded, then load</u> | <span style="background-color: yellow; color: black; padding: 2px;">YELLOW</span> |
| 90 - 100                 | `OK TO LOAD`          | <u>OK to load immediately onto the aircraft</u><br>(either pax in proximity of boarding gate or boarded flight)                      | <span style="background-color: green; color: white; padding: 2px;">GREEN</span>  |
| N/A                      | Errornous (Connectivity, server etc) | <u>Scan passive RFID for status review</u> | <span style="background-color: red; color: white; padding: 2px;">FLASHING RED</span> at 1s period |

## Conclusion

...