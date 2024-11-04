from datetime import datetime
from dateutil.relativedelta import relativedelta
from mail_send import send_mail
from models import Customer
import socket

def send_pdf(quote, recipients, footer):

    # set is_approve only if recipients is empty
    is_approve = False if recipients else True

    html = html_header
    
    # Get the current date
    current_date = datetime.strptime(quote["created_at"], "%Y-%m-%d %H:%M:%S")
    
    # Add one month to the current date
    due_date = current_date + relativedelta(months=1)
    
    # Start building the HTML body
    html += f"""
    <body>
        <div class="invoice-box">
            <table cellpadding="0" cellspacing="0">
                <tr class="top">
                    <td colspan="2">
                        <table>
                            <tr>
                                <td class="title">
                                    <div style="width: 100%; max-width: 300px">Quote Pro Tool</div>
                                </td>

                                <td style="text-align: right;">
                                    Quote #{quote.get("quote_number")}<br />
                                    Created: {current_date.strftime("%B %d, %Y")}<br />
                                    Due: {due_date.strftime("%B %d, %Y")}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <tr class="information">
                    <td colspan="2">
                        <table>
                            <tr>
                                <td>
                                    Templar Screens LLC<br />
                                    530 3rd St SW<br />
                                    Auburn, WA 98001
                                </td>
                                <td style="text-align: right;">
                                    {quote["customer"]["first_name"]} {quote["customer"]["last_name"]}<br />
                                    {quote["customer"]["address_1"]}<br />
                                    {quote["customer"]["address_2"] + "<br />" if quote["customer"]["address_2"] else ""}
                                    {quote["customer"]["city"]}, {quote["customer"]["state"]} {quote["customer"]["zip_code"]}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <tr class="heading">
                    <td>Item</td>
                    <td>Price</td>
                </tr>
    """
    
    # Loop through screen configurations
    for screen in quote["screenconfigurations"]:
        description = screen["description"].replace("\n", "<br />")
        list_price = screen["formatted_unit_total"]
        html += f"""
                <tr class="item">
                    <td>Templar Screen Unit
                        <div style="margin-left: 24px;">
                            {description}
                        </div>
                    </td>
                    <td style="text-align: right;">{unit_total}</td>
                </tr>
        """
        
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("8.8.8.8", 80))
    ip = s.getsockname()[0]
    s.close()

    # Close the HTML body
    html += f"""
                <tr class="total">
                    <td></td>
                    <td style="text-align: right;">Total: {quote["formatted_quote_total"]}</td>
                </tr>
            </table>
            """
    
    if footer:
        html += f"""
            <div style="text-align: center; margin-top: 20px; margin-botton: 8px;">
                <p style="font-style: italic;">{footer}</p>
            </div>
        """
        
    if is_approve:
        html += f"""
            <div style="text-align: center;">
                <a href="http://{ip}:3000/quote-preview/{quote['hashedKey']}" style="margin-top: 20px; padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer; text-decoration: none; display: inline-block;">Approve/Reject</a>
            </div>
            """  
            
    html += f"""
        </div>
    </body>
    </html>
    """
    
    print(recipients)
    # Send the email
    send_mail(([quote["customer"]["email"]]) if is_approve else recipients, subject=f"QuotePro | Quote {'' if is_approve else 'preview '}#{quote['quote_number']}", html_body=html)
    


html_header = """
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <style>
        body {
            font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
            font-size: 16px;
            line-height: 24px;
            color: #555;
            margin: 0;
            padding: 0;
        }

        .invoice-box {
            width: 80%;
            max-width: 800px;
            margin: auto;
            padding: 30px;
            border: 1px solid #eee;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
        }

        .invoice-box table {
            width: 100%;
            line-height: inherit;
            text-align: left;
            border-collapse: collapse;
        }

        .invoice-box table td {
            padding: 5px;
            vertical-align: top;
        }

        .invoice-box table tr td:nth-child(2) {
            text-align: right;
        }

        .invoice-box table tr.top table td {
            padding-bottom: 20px;
        }

        .invoice-box table tr.top table td.title {
            font-size: 45px;
            line-height: 45px;
            color: #333;
        }

        .invoice-box table tr.information table td {
            padding-bottom: 40px;
        }

        .invoice-box table tr.heading td {
            background: #eee;
            border-bottom: 1px solid #ddd;
            font-weight: bold;
        }

        .invoice-box table tr.details td {
            padding-bottom: 20px;
        }

        .invoice-box table tr.item td {
            border-bottom: 1px solid #eee;
        }

        .invoice-box table tr.item.last td {
            border-bottom: none;
        }

        .invoice-box table tr.total td:nth-child(2) {
            border-top: 2px solid #eee;
            font-weight: bold;
        }

        .invoice-box div {
            list-style-type: none;
            padding: 0;
            margin: 0;
            color: #717171;
            font-weight: light;
            white-space: pre-wrap;
        }
    </style>
</head>
"""