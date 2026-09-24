# SMART PROCURE — PROJECT SPECIFICATION
## Team: Titiksa
## SIH 2026 — Demo-First Working MVP

---

## 1. PRODUCT

Smart Procure is a digital agricultural procurement platform connecting:

- Farmers
- Government Verification Officers
- Procurement Centre Operators
- District / Zone / State Administrators

Core journey:

FARMER REGISTRATION
→ GOVERNMENT VERIFICATION
→ QUANTITY-BASED BOOKING
→ PRE-APPOINTMENT CONFIRMATION
→ QR CODE
→ LIVE QUEUE
→ QR CHECK-IN
→ WEIGHT + QUALITY
→ PRICE CALCULATION
→ RECEIPT
→ ADMIN MONITORING

The objective is to demonstrate a realistic, connected procurement workflow.

This is a demo-first MVP. Do not waste time implementing production government integrations.

---

# 2. MOST IMPORTANT REQUIREMENT

The application must feel like a REAL software product.

The UI must NOT look AI-generated.

Design it as if it were created by an experienced product/UI team for an actual government/public-service application.

Use:

- restrained colors
- consistent spacing
- realistic typography
- practical forms
- meaningful tables
- realistic dashboards
- clear hierarchy
- subtle borders
- sensible shadows
- professional icons
- useful empty/loading/error states
- realistic data density

Avoid:

- excessive gradients
- excessive glassmorphism
- huge rounded cards
- excessive floating cards
- unnecessary animations
- decorative 3D illustrations
- random AI-generated images
- excessive icon usage
- giant headings with little information
- unrealistic dashboards
- excessive badges/pills
- fake-looking statistics
- generic startup landing-page design

The application should look believable when shown to SIH judges.

---

# 3. MVP PRIORITY

The most important working flow is:

Farmer Login
→ Verified Profile
→ Select Crop
→ Enter Expected Quantity
→ Select Centre
→ Select Date/Time Window
→ Quantity-Based Capacity
→ Book
→ QR
→ One-Day Confirmation
→ YES / NO
→ Release Capacity if NO
→ Operator Queue
→ QR Scan
→ Farmer Details
→ Actual Weight
→ Quality
→ Price
→ Receipt
→ Admin Update

This flow must work completely.

Secondary features must not compromise this flow.

---

# 4. ROLES

## Farmer

Can:

- login
- register
- view profile
- update profile
- view verification status
- book appointment
- choose centre
- choose date/time
- enter expected quantity
- receive QR
- confirm appointment
- cancel appointment
- track queue
- view history
- view receipt
- receive notifications
- change language
- use AI help

## Verification Officer

Can:

- view pending farmers
- inspect submitted information
- approve
- reject
- request correction
- view verification history

## Procurement Operator

Can:

- view centre dashboard
- view live queue
- see farmer details
- mark arrived
- mark no-show
- start procurement
- scan QR
- enter actual weight
- enter quality
- calculate price
- verify transaction
- generate receipt
- report procurement-point issues

## Admin

Can:

- view dashboard
- manage centres
- manage procurement points
- update capacity
- view bookings
- view queues
- view procurement
- view incidents
- view reports
- view analytics

---

# 5. FARMER REGISTRATION

Flow:

Mobile Number
→ Mock OTP
→ Registration Form
→ Submit
→ Pending Verification
→ Officer Review
→ Verified / Rejected / Correction Required

Possible information:

- name
- mobile number
- masked Aadhaar/reference number
- address
- village
- district
- state
- land information
- land area
- crop/produce information
- other necessary procurement information

Do not collect unnecessary personal information.

Do not implement real Aadhaar or land-record integrations.

---

# 6. VERIFICATION

States:

PENDING
VERIFIED
REJECTED
CHANGES REQUIRED

Officer can:

APPROVE
REJECT
REQUEST CORRECTION

Keep verification history.

---

# 7. RE-VERIFICATION

When a verified farmer books again:

Ask:

"Has any registered information changed?"

NO
→ directly proceed to booking.

YES
→ update information
→ submit changes
→ status becomes PENDING RE-VERIFICATION
→ booking remains blocked until approval

Do not delete the previous verified information.

---

# 8. PROCUREMENT CENTRES

A centre may have multiple procurement points.

Example:

Centre A
├── Point 1
├── Point 2
└── Point 3

Point states:

AVAILABLE
PROCESSING
UNAVAILABLE
MAINTENANCE

---

# 9. QUANTITY-BASED CAPACITY

This is one of the core concepts.

Capacity is based on expected produce quantity, not number of farmers.

Example:

11:00–12:00

Total Capacity = 100 KG

Existing reservations:

40 KG
30 KG
20 KG

Reserved = 90 KG

Available = 10 KG

A farmer requesting 10 KG can book.

A farmer requesting 15 KG cannot.

The application must update capacity immediately.

Cancellation and released bookings must return their reserved quantity to available capacity.

---

# 10. EXPECTED VS ACTUAL QUANTITY

Expected quantity is entered during booking.

Actual quantity is entered during procurement.

Example:

Expected = 40 KG
Actual = 36 KG

Valid.

Example:

Expected = 40 KG
Actual = 52 KG

Require configured tolerance/operator approval.

Never automatically accept unlimited excess quantity.

---

# 11. BOOKING

Farmer chooses:

- crop
- expected quantity
- centre
- date
- time window

Show:

Total Capacity
Reserved Quantity
Available Quantity
Estimated Waiting Time

Example:

11:00–12:00
Capacity: 100 KG
Reserved: 70 KG
Available: 30 KG
Your request: 20 KG

BOOK NOW

After booking:

Available = 10 KG

Keep:

Booking
Time Window
Expected Quantity
Queue Position
QR Token

as distinct concepts.

---

# 12. PRE-APPOINTMENT CONFIRMATION

One day before the appointment:

Show:

"Your procurement appointment is tomorrow. Will you be available?"

Default:

YES

Options:

YES
NO

YES:
→ booking remains confirmed.

NO:
→ booking becomes released/cancelled
→ reserved quantity is released
→ available capacity increases
→ another farmer can book the released quantity
→ notification/audit entry created

Example:

Before:

Capacity = 100 KG
Reserved = 70 KG
Available = 30 KG

Farmer reservation = 20 KG

Farmer selects NO.

After:

Reserved = 50 KG
Available = 50 KG

This feature must be very visible during the demonstration.

---

# 13. CANCELLATION

When an active booking is cancelled:

- booking remains in history
- booking status changes
- reserved quantity is released
- available capacity increases
- audit entry is created

Do not delete the booking.

---

# 14. NO-SHOW

If a farmer does not arrive during the configured arrival period:

Operator can select:

MARK NO-SHOW

Then:

- booking becomes NO-SHOW
- reserved quantity becomes releasable
- queue updates
- capacity updates
- audit event is recorded

---

# 15. QR

After booking:

Generate a QR code containing a secure booking/token reference.

Do not put Aadhaar or unnecessary sensitive data directly into the QR.

Operator:

QR Scan
→ Validate
→ Retrieve Booking
→ Retrieve Farmer
→ Show Details

Handle:

- invalid QR
- cancelled QR
- expired QR
- already-used QR
- valid QR

Prevent duplicate procurement.

For the MVP, a realistic "Scan Demo QR" simulation is acceptable.

---

# 16. OPERATOR QUEUE

Show:

- farmer name
- booking ID
- expected quantity
- appointment
- queue position
- arrival status
- current status

Actions:

MARK ARRIVED
START PROCESS
MARK NO-SHOW
CANCEL
COMPLETE

Statuses:

WAITING
ARRIVED
PROCESSING
COMPLETED
NO-SHOW
CANCELLED

---

# 17. PROCUREMENT

Flow:

QR / Booking Verification
→ Actual Weight
→ Quality
→ Price
→ Final Verification
→ Receipt

When QR is scanned, automatically display:

- farmer name
- farmer reference
- village
- crop
- expected quantity
- booking ID
- centre
- appointment

Operator should not re-enter farmer information manually.

---

# 18. WEIGHT

Operator enters:

Expected Quantity
Actual Quantity

Allow differences.

If actual quantity exceeds configured tolerance:

Require approval/override.

---

# 19. QUALITY

Use configurable commodity-specific fields.

Demonstration fields can include:

- grade
- moisture
- impurity

Do not claim hardware/sensor integration.

---

# 20. PRICE

Use configurable mock pricing.

Example:

Actual Quantity × Unit Price
+/- Quality Adjustment
= Total Amount

Show the calculation clearly.

Do not claim a specific government pricing rule unless validated.

---

# 21. RECEIPT

Generate a professional printable receipt containing:

- receipt number
- booking ID
- farmer reference
- farmer name
- centre
- date/time
- crop
- expected quantity
- actual quantity
- quality
- unit price
- adjustment
- total amount
- payment status
- operator reference

Provide:

PRINT
VIEW RECEIPT
DOWNLOAD

---

# 22. PROCUREMENT-POINT INCIDENTS

Operator can report:

- Equipment Failure
- Electricity Problem
- Network Problem
- Staff Shortage
- Maintenance
- Other

Incident contains:

- point
- issue
- description
- timestamp
- severity
- status

When a point becomes unavailable:

- update status
- reflect capacity/operational impact
- show affected bookings if applicable
- notify responsible users
- preserve audit information

Do not silently delete bookings.

---

# 23. ADMIN

Support:

State
→ Zone
→ District
→ Centre
→ Procurement Point

Admin can:

- add centre
- edit centre
- deactivate centre
- manage points
- configure capacity
- configure hours
- monitor bookings
- monitor queue
- monitor procurement
- monitor incidents

Analytics:

- registered farmers
- verified farmers
- pending verification
- active bookings
- expected quantity
- procured quantity
- completed transactions
- pending transactions
- cancellations
- no-shows
- average waiting time
- average processing time
- centre utilization

---

# 24. ETA

Do not build ML for MVP.

Use a deterministic function based on:

- queue size
- expected quantity
- active procurement points
- average processing duration
- operational state

Create:

estimateWaitingTime()

Make it replaceable later with a statistical/ML model.

Collect historical data for:

- booking time
- appointment time
- arrival time
- queue entry
- processing start
- processing end
- expected quantity
- actual quantity
- centre
- point
- no-show
- cancellation
- incidents

---

# 25. MULTILINGUAL SUPPORT

Support English plus:

Assamese
Bengali
Bodo
Dogri
Gujarati
Hindi
Kannada
Kashmiri
Konkani
Maithili
Malayalam
Manipuri
Marathi
Nepali
Odia
Punjabi
Sanskrit
Santali
Sindhi
Tamil
Telugu
Urdu

Use proper i18n architecture.

English and Hindi must be complete in the MVP.

The remaining languages must be structurally supported through translation dictionaries.

Support Urdu RTL layout.

Do not use AI to translate static interface text at runtime.

---

# 26. OPENROUTER AI

OpenRouter is an optional assistant.

Use it only for:

- farmer help
- explaining booking
- explaining queue
- explaining receipts
- generic procurement guidance
- controlled multilingual assistance
- simple admin summaries

AI must never directly modify:

- verification
- booking
- capacity
- queue
- procurement
- payment

Core business logic must remain deterministic.

If OpenRouter fails, the application continues working.

Sensitive information such as Aadhaar, OTPs, passwords and unnecessary personal data must not be sent to the AI model.

---

# 27. NOTIFICATIONS

Create in-app notifications for:

- registration
- verification
- correction request
- re-verification
- booking
- cancellation
- appointment reminder
- confirmation
- released capacity
- queue update
- centre incident
- procurement completion
- receipt
- payment state

SMS and calls are simulated.

---

# 28. DEMO DATA

Seed realistic deterministic data:

- 15–20 farmers
- multiple villages
- multiple crops
- multiple centres
- multiple procurement points
- multiple appointment windows
- active bookings
- completed transactions
- cancelled bookings
- no-shows
- pending verification
- incidents

Use realistic values.

---

# 29. REQUIRED PAGES

## Farmer

- Login
- Dashboard
- Profile
- Verification Status
- Book Slot
- Booking Details
- Confirmation
- QR
- Queue
- History
- Receipt
- Notifications
- Help
- Language

## Officer

- Dashboard
- Pending Verification
- Verification Details
- Verification History

## Operator

- Dashboard
- Queue
- Procurement
- Receipt
- Incidents
- Centre Status

## Admin

- Dashboard
- Centres
- Capacity
- Bookings
- Procurement
- Incidents
- Reports
- Analytics

Every navigation link must work.

No dead pages.

No placeholder "Coming Soon" for core functionality.

---

# 30. SHARED APPLICATION STATE

All role dashboards must represent the same system.

Example:

Farmer books 20 KG
→ booking appears in Operator queue
→ operator completes procurement
→ receipt is created
→ Admin statistics update

Do not create separate fake datasets that contradict each other.

Use a centralized state/mock service.

---

# 31. LOGIN

For MVP:

Use simple demo role authentication.

Provide:

FARMER DEMO
OFFICER DEMO
OPERATOR DEMO
ADMIN DEMO

Real OTP is not required.

The login experience should still look realistic.

---

# 32. RESPONSIVE DESIGN

Farmer:

mobile-first

Operator:

desktop/tablet optimized

Admin:

desktop optimized

All important functionality should remain usable on smaller screens.

---

# 33. REALISTIC UI REQUIREMENT

The design must follow real product-design principles.

Do not design the application as a collection of "feature cards".

Use appropriate UI patterns:

- tables where data is tabular
- forms where information is entered
- side navigation for staff dashboards
- tabs where related operational states exist
- modals only when necessary
- drawers for contextual details
- timelines for process/status
- progress indicators for procurement
- charts only where they communicate something useful

Farmer screens should feel like a real mobile government service.

Operator screens should feel like real operational software.

Admin screens should feel like a real monitoring system.

Use realistic data density.

Do not fill empty space with decorative graphics.

---

# 34. VISUAL DESIGN

Use a restrained professional palette.

Primary:
Blue

Secondary:
Green

Warning:
Orange

Danger:
Red

Neutral:
White / light grey / dark grey

Use color meaningfully.

Do not use gradients everywhere.

Keep borders subtle.

Use shadows sparingly.

Use one icon style consistently.

Keep corner radii moderate rather than making every element excessively rounded.

Typography should prioritize readability.

---

# 35. MICROINTERACTIONS

Use only useful interactions:

- hover feedback
- button states
- success notification
- loading state
- validation state
- confirmation modal
- subtle transition between steps

Avoid:

- excessive animation
- bouncing elements
- animated backgrounds
- unnecessary page transitions
- decorative motion

The application should feel fast and professional.

---

# 36. SECURITY

For MVP:

- protected routes
- role-based access
- input validation
- environment variables for secrets
- no API keys in frontend
- QR validation
- duplicate-processing prevention
- audit logging

Do not over-engineer production security.

---

# 37. EDGE CASES

Handle:

- duplicate booking
- insufficient quantity capacity
- cancellation
- pre-appointment NO
- no-show
- late arrival
- invalid QR
- expired QR
- reused QR
- changed profile
- pending verification
- rejected verification
- actual quantity lower than expected
- actual quantity higher than expected
- procurement-point failure
- empty queue
- failed payment simulation
- network failure
- OpenRouter failure

Show a useful message instead of crashing.

---

# 38. MOCK / FUTURE INTEGRATIONS

Clearly mark these as mock/future:

- Aadhaar verification
- land-record verification
- government APIs
- SMS
- voice calls
- payment gateway
- weighing machine
- ML prediction

The following must actually work in the MVP:

- navigation
- booking
- quantity capacity
- cancellation/release
- confirmation
- QR
- queue
- procurement
- weight
- quality
- price
- receipt
- incidents
- admin dashboard

---

# 39. CORE BUSINESS RULES

1. Unverified farmers cannot book.

2. Verified farmers do not need re-verification if information has not changed.

3. Changed information requires re-verification.

4. Capacity is based on expected quantity.

5. Booking reserves quantity.

6. Cancellation releases quantity.

7. Pre-appointment NO releases quantity.

8. No-show can release quantity.

9. Expected quantity and actual quantity are different.

10. Excess actual quantity requires configured handling.

11. Completed bookings cannot be processed twice.

12. Invalid/cancelled/expired QR cannot start procurement.

13. Procurement-point failure must remain visible.

14. AI cannot modify critical business state.

15. The application continues functioning when OpenRouter is unavailable.

---

# 40. PRIMARY JUDGE DEMO

The following must work smoothly:

### Farmer

Login
→ Verified Profile
→ Book Procurement
→ Select Crop
→ Enter 20 KG
→ Select Centre
→ View Available Capacity
→ Book
→ QR

### Confirmation

One day before:
YES / NO

Demonstrate:

NO
→ reserved quantity released
→ capacity increases
→ another farmer can book the released quantity

### Operator

Login
→ Queue
→ Start Process
→ Scan Demo QR
→ Farmer details automatically appear
→ Actual Weight
→ Quality
→ Price
→ Verify
→ Receipt

### Admin

Login
→ Dashboard
→ Centre Status
→ Capacity
→ Procurement
→ Incident
→ Analytics

The complete journey must use the same application state.

---

# 41. BUILD STRATEGY

Build in this order:

1. Project structure
2. Design system
3. Routing
4. Shared mock state
5. Farmer pages
6. Booking/capacity
7. Confirmation/release
8. QR
9. Operator queue
10. Procurement
11. Receipt
12. Admin
13. Officer verification
14. i18n
15. OpenRouter AI
16. Final QA

Do not rebuild working modules.

Do not add unnecessary dependencies.

---

# 42. FINAL QUALITY BAR

The final result should make a judge feel:

"This is an actual product prototype."

It should NOT feel like:

"An AI generated collection of dashboards."

The application must have:

- coherent navigation
- consistent design
- realistic information architecture
- connected state
- believable data
- functional interactions
- useful error states
- polished forms
- credible tables
- practical dashboards
- smooth demo flow

The core story should remain:

VERIFIED FARMER
→ QUANTITY-BASED CAPACITY
→ PRE-APPOINTMENT CONFIRMATION
→ RELEASED CAPACITY
→ QR CHECK-IN
→ LIVE QUEUE
→ PROCUREMENT
→ RECEIPT
→ ADMIN VISIBILITY

## PRIMARY PRINCIPLE

### Build fewer things, but make the things that exist feel real and work together.
