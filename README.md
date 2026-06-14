# 🩸 BloodLink – Blood Donation and Request Management System

BloodLink is a full-stack web application that connects blood donors and recipients. The platform allows recipients to request blood during emergencies and enables donors to offer help directly through the system. It aims to simplify the process of finding blood donors and improve communication between people in need and those willing to donate.

---

## 📌 Features

### 👤 Authentication and User Management
- User registration and login using JWT authentication.
- Custom user model with different roles:
  - Donor
  - Recipient
  - Admin
- Profile management for all users.

---

## 🩸 Donor Features

- Create and manage blood availability records.
- View all blood requests posted by recipients.
- Express willingness to donate to a specific request.
- Add a message while offering to donate.
- Prevent duplicate donation offers for the same request.
- View all donation offers made by themselves.

---

## 🏥 Recipient Features

- Create blood requests.
- View their own blood requests.
- Browse available blood donors.
- Send direct donation requests to available donors.
- Receive notifications when donors express interest in donating.
- Track the status of donation requests.

---

## 🔔 Donation Workflow

### Direct Donation Request

1. Recipient browses available blood.
2. Recipient sends a request to a donor.
3. Donor views incoming requests.
4. Donor accepts or rejects the request.
5. Recipient sees the updated request status.

---

### Donation Offer Workflow

1. Recipient posts a blood requirement.
2. Donors view all active blood requests.
3. Donor clicks **"Want to Donate"**.
4. A donation offer is created.
5. Recipient receives a notification indicating that a donor is willing to help.
6. Recipient can contact the donor for further coordination.

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router
- Tailwind CSS
- JavaScript
- Fetch API

### Backend
- Django
- Django REST Framework (DRF)
- JWT Authentication

### Database
- PostgreSQL

---

## 📂 Project Structure

### Backend

```
backend/
├── backend/
├── blood/
│   ├── migrations/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   └── admin.py
├── manage.py
└── requirements.txt
```

### Frontend

```
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── vite.config.js
```

---

## 🗃 Database Models

### MyUser

Custom user model extending Django's `AbstractUser`.

Fields include:

- Username
- Email
- Age
- Blood Group
- Gender
- Location
- Role

---

### DonorProfile

Stores donor-specific information.

```python
user → OneToOne(MyUser)
```

---

### RecipientProfile

Stores recipient-specific information.

```python
user → OneToOne(MyUser)
```

---

### AvailableBlood

Represents blood units available for donation.

Fields:

- Donor
- Blood Group
- Last Donated Date
- Location
- Contact Number
- Units Available

---

### BloodRequest

Represents blood requirements created by recipients.

Fields:

- Recipient
- Blood Group
- Units Required
- Hospital Name
- Hospital Address
- Contact Number
- Urgency Level

---

### DonationRequest

Represents direct requests sent from recipients to donors.

Fields:

- Recipient
- Available Blood
- Status
- Contact Number
- Urgency
- Hospital
- Location

Status:

- Pending
- Accepted
- Rejected

---

### DonationOffer

Represents offers initiated by donors.

Fields:

- Blood Request
- Donor
- Message
- Want to Donate
- Created At

---

## 🔑 API Endpoints

### Authentication

| Method | Endpoint | Description |
|----------|-----------|--------------|
| POST | `/api/register/` | Register new user |
| POST | `/api/` | Login user |
| GET | `/api/myprofile/` | Get logged-in user profile |

---

### Blood Requests

| Method | Endpoint | Description |
|----------|-----------|--------------|
| POST | `/api/request/` | Create blood request |
| GET | `/api/seerequest/` | View blood requests |

---

### Available Blood

| Method | Endpoint | Description |
|----------|-----------|--------------|
| POST | `/api/listblood/` | Add available blood |
| GET | `/api/seeblood/` | View available blood |

---

### Donation Requests

| Method | Endpoint | Description |
|----------|-----------|--------------|
| POST | `/api/request_donation/` | Send request to donor |
| GET | `/api/request_donation/` | View donation requests |
| PATCH | `/api/donation_response/<id>/` | Accept or reject request |

---

### Donation Offers

| Method | Endpoint | Description |
|----------|-----------|--------------|
| POST | `/api/donation_offer/` | Donor offers to donate |
| GET | `/api/donation_offer/` | View donation offers |

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/BloodLink.git
cd BloodLink
```

---

## Backend Setup

Create virtual environment:

```bash
python -m venv env
```

Activate environment:

### Windows

```bash
env\Scripts\activate
```

### Linux/Mac

```bash
source env/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Apply migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```

Run server:

```bash
python manage.py runserver
```

Backend runs on:

```
http://127.0.0.1:8000/
```

---

## Frontend Setup

Install packages:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173/
```

---

## Future Improvements

- Real-time notifications using Django Channels.
- Chat system between donors and recipients.
- Email notifications.
- SMS alerts.
- Blood compatibility matching.
- Donation history analytics.
- Hospital verification.
- Admin dashboard and reporting.
- Deployment using Docker.

---

## Project Goal

The goal of BloodLink is to provide a simple and efficient platform that bridges the gap between blood donors and recipients, reducing delays during emergencies and encouraging community-driven blood donation.

---

## Author

**Madhusudan Bhandari**

Frontend Developer | React & Django Enthusiast

GitHub: https://github.com/yourusername
LinkedIn: https://linkedin.com/in/yourprofile

---
