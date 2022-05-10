# Fyre
App to help evacuation in case of emergencies

# How does it work?
It's a 3 step process.
- Load XLSX - Load an excel file from your phone storage with details of employees who have checked into office that day.
- Scan QR codes from ID cards to mark employees as safe - you can keep track of employees who are unaccounted for.
- End evacuation

# Important Input formats
- XLSX file

| Employee name  | Employee id |
| -------------- | ----------- |
|       ABC      |     ID1     |
|       XYZ      |     ID2     |

- QR Code data

```json
{
  "Employee ID": "ID123",
  "Employee name": "Nightmare" 
}
```
