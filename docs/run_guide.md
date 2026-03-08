# How to Run SK Traders Website Locally

Follow these steps to start your development environment whenever you open your IDE.

## 1. Open the Project
Open your IDE (VS Code or similar) and ensure you are in the `c:\SK-Traders` directory.

## 2. Open a Terminal
In your IDE, open a new terminal window (shortcut: `Ctrl + ` ` ` in VS Code).

## 3. Start the Development Server
Type the following command and press **Enter**:
```bash
npm run dev
```

## 4. View the Website
Once the terminal shows "Ready" or "Started", open your browser and go to:
- **Main Website**: [http://localhost:3000](http://localhost:3000)
- **Admin Dashboard**: [http://localhost:3000/admin/dashboard](http://localhost:3000/admin/dashboard)

---

## 5. How to Deploy Changes
Vercel is connected to your GitHub. Every time you "push" new code, it updates the website automatically!

1. **Save your changes** in the IDE.
2. **Open the Terminal** and run these 3 commands:
   ```bash
   git add .
   git commit -m "Describe your changes here"
   git push
   ```
3. **Wait 1 minute**: Vercel will see the update and redeploy your site.


---

### Troubleshooting
- **Port Conflict**: If port 3000 is busy, the app might run on [http://localhost:3001](http://localhost:3001). Check the terminal output for the correct URL.
- **Dependencies**: If you see "next is not recognized", run `npm install` first.
