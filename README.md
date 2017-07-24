# Invoicer
An app that bulk invoices clients through email.
## Summary
Invoicer is an automated system for invoicing large groups of customers via email. The idea is to help companies who bulk send customer invoices for completed transactions. 
## Usage
- Upload a csv with customer information. 
- Create invoice template. 
- Send invoices through email. 

### Initial Setup
User selects a "sent from" address and sets other global variables which are to be determined. 
### Step by Step
The user uploads a csv, decides what information each invoice requires, then maps the key of each piece of informationt to its corresponding column in the csv. The next view is the invoice designer, where the user composes their invoice and decides which information goes where. Next is an invoice preview - where user also has a chance to send a test email. Next is the send screen, where the user reviews the batch, confirms details, and sends the emails. 

At this point, the backend stores the json array of emails in a DB for the user's records. 
