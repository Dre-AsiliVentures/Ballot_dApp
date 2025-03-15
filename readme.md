# Ballot dApp

A decentralized voting application powered by **Django (Backend)** and **Next.js (Frontend)** with **Solidity smart contracts** deployed on an Ethereum-compatible blockchain.

---

## 🚀 Features
- **Smart Contract-Based Voting** (Solidity, Hardhat)
- **Django Backend** (API & Static File Hosting)
- **Next.js Frontend** (Static Export for Deployment)
- **JWT Authentication with Web3 Wallets**
- **Fetch.AI Agent Integration for Automated Monitoring**

---

## 🏗️ Project Structure
```
voting-app/
│── backend/               # Django backend
│   ├── voting/            # Django app
│   │   ├── static/        # Stores Next.js build files
│   │   ├── templates/     # HTML templates (optional)
│   │   ├── views.py       # Serves static files
│   │   ├── urls.py        # URL routing
│   │   ├── settings.py    # Django settings
│   │   ├── wsgi.py        # WSGI application
│   ├── manage.py          # Django project manager
│── frontend/              # Next.js frontend
│   ├── pages/             # Next.js pages
│   ├── components/        # React components
│   ├── context/           # Web3 provider and contract interaction
│   ├── package.json       # Dependencies
│   ├── next.config.js     # Next.js config
│   ├── hardhat/           # Hardhat for Solidity deployment
│   ├── artifacts/         # Compiled contract ABI
│── requirements.txt       # Python dependencies
│── README.md              # Project documentation

```

---

## 🛠️ Setup & Installation
### 1️⃣ Backend (Django)
```sh
cd backend
python -m venv venv
source venv/bin/activate  # (Windows: venv\Scripts\activate)
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 2️⃣ Smart Contracts (Hardhat)
```sh
cd contracts
npm install
touch .env  # Add Alchemy/Infura API key & Private Key
npx hardhat compile
npx hardhat test
npx hardhat run scripts/deploy.js --network goerli
```

### 3️⃣ Frontend (Next.js)
```sh
cd frontend
npm install
npm run build
npm run export
```
Move `frontend/out/` contents to `backend/voting/static/` for Django to serve.

---

## 🚀 Deployment (Django + Next.js Static Export)
```sh
cd backend
python manage.py collectstatic
python manage.py runserver
```
Access via: [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## 📜 API Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/vote` | POST | Submit a vote |
| `/api/results` | GET | Get election results |
| `/api/authenticate` | POST | Web3 Wallet Authentication |

---

## 📌 Notes
- Ensure **Next.js static files** are inside `backend/voting/static/`.
- Smart contracts require a **Goerli Testnet** deployment.
- Web3 authentication requires **Metamask or WalletConnect**.

---

## 🎯 To-Do
- [ ] Improve UI with Tailwind CSS
- [ ] Add Fetch.AI agent automation
- [ ] Deploy on Vercel & AWS (Backend + Contracts)

🚀 **Happy BUIDLing!** 🛠️

