# D's PANAI — order system setup (Google Sheets)

1. Go to https://sheets.new and create a new sheet. Name it "D's PANAI Orders".
2. Menu: **Extensions → Apps Script**. Delete the sample code.
3. Open `apps-script/Code.gs` from this project, copy everything, paste it in, and save.
4. In the toolbar, choose the function **setup** and press **Run**. Allow the
   permissions Google asks for (it needs to send email and create the invoice PDF).
5. Press **Deploy → New deployment → Web app**:
   - Description: `D's PANAI orders`
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Press **Deploy**, then copy the web app URL that ends in `/exec`.
7. Send that URL back in the chat — it is saved as `APPS_SCRIPT_URL`.

## Updating an existing deployment

After changing `Code.gs`, saving the file does not update the live `/exec` URL.
Create a new version of the existing web-app deployment:

1. Save `Code.gs`.
2. Open **Deploy -> Manage deployments**.
3. Edit the existing web-app deployment.
4. Set **Version** to **New version**, then click **Deploy**.
5. Keep the same `/exec` URL and test it again.

The tracking page sends `action: "track"` with the order ID. The deployed version
must include the `track` branch in `doPost` and the `trackOrder_` function.

The security token inside `Code.gs` (`SHARED_TOKEN`) already matches the
website's saved `APPS_SCRIPT_TOKEN`. Do not change one without the other.

## What happens on each order

- A unique order ID is created: `DSP-YYMMDD-0001`
- A colour-coded row is added to the Orders sheet
- A branded invoice PDF (logo + website colours) is generated
- The customer gets a thank-you email with the invoice attached
- divyaselvaraj339@gmail.com gets a copy with all order details
- Changing the status (in the sheet dropdown or on `/order-divya2004`)
  emails the customer automatically
