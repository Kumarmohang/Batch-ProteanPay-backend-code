export const template: any = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>InvoidePdf</title>
    <style>
        * {
            font-family: arial !important;
        }

        table {
            font-family: arial !important;
            border-collapse: collapse;
            width: 100%;
        }

        td,
        th {
            padding: 10px;
            font-size: 15px;
        }

        tr {
            font-size: 15px;
            border: 1px solid #2e74b5;
        }

        p {
            font-size: 15px;
        }

        .table-header1 {
            width: 25%;
            text-align: left;
        }

        .table-header4 {
            width: 35%;
            text-align: right;
        }

        .table-row-last {
            text-align: right;
        }

        .table-first-row {
            border-bottom: 2.5px solid #2e74b5;
        }
    </style>
</head>

<body>
    <div class="outterContainer">
        <div style="padding:3% 5%">
            <div style="display:flex;justify-content:space-between">
                <div style="width:60%;">
                    <h3 style="color:#595959;font-size: 19px;">Amrit AG</h3>
                    <p>{{invoice.from}}</p>
                </div>
                <div style="text-align:right">
                    <h1 style="color:#2e74b5;font-weight:bold;font-size: 35px;">INVOICE</h1>
                </div>

            </div>


            <div style="display:flex;margin-bottom:2%;margin-top:1.5%">
                <div style="width:60%;">
                    <p style="color:#404040">Grabenstrasse 25</p>
                    <p style="color:#404040">6340 Baar</p>
                    <p style="color:#404040">Switzerland</p>
                    <p class="">
                        support@amrit.ai | www.amrit.ai
                    </p>
                </div>
                <div style="width:40%;text-align:right;">
                    <p>
                        <span style="color:#2e74b5;font-weight:bold">INVOICE NO.</span>
                        <span> {{invoice.customInvoiceIdentifier}}</span>
                    </p>
                    <p>
                        <span style="color:#2e74b5;font-weight:bold">DATE</span>
                        <span>{{invoice.formattedDate}}</span>
                    </p>
                </div>
            </div>

            <div style="display:flex;margin-bottom:4%;">
                <div style="width:60%;">
                    <p>
                        <span style="color:#2e74b5;font-weight:bold">Invoice TO</span>
                    </p>
                    <p>{{invoice.payer.payerText}}</p>
                </div>
                <div style="width:40%;text-align:right;">
                    <p class="grabenstrasse25P">
                        <span style="color:#2e74b5;font-weight:bold">FOR </span>
                        <span class="streetAddressSpan">
                            {{directory.name}}
                        </span>
                    </p>
                    <p class="grabenstrasse25P">
                        <span style="color:#2e74b5;font-weight:bold">Project Code</span>
                        <span class="streetAddressSpan">{{invoice.customDirectoryIdentifier}}</span>
                    </p>
                </div>
            </div>

            <div>
                <table>
                    <tr class="table-first-row">
                        <th class="table-header1">Records Matched</th>
                        <th style="width:20%;text-align: center">Patients Count</th>
                        <th style="width:20%;text-align: center">Records Count</th>
                        <th class="table-header4">Amount(AMRT)</th>
                    </tr>
                    {{ITEMS}}
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="table-row-last"><span style="color:#2e74b5;font-weight:bold">Discount ({{DISCOUNT}}%) :</span>
                            {{DISCOUNT_AMOUNT}}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="table-row-last"><span style="color:#2e74b5;font-weight:bold">Tax ({{TAX}}%) :</span>
                            {{TAX_AMOUNT}}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="table-row-last"><span style="color:#2e74b5;font-weight:bold">Total Amount (AMRT) :</span>
                            {{TOTAL_AMOUNT}}</td>
                    </tr>
                </table>
            </div>
            <div style="margin-top:3%">
                <p style="font-weight:bold">Terms and Instructions</p>
                <p style="margin-left:1%;">1. Payment terms - Payment in advance in AMRT tokens as agreed in marketplace
                    contractual terms</p>
                <p style="margin-left:1%;">2. Service period same as invoice data</p>
                <p style="margin-left:1%;">3. Invoice is valid for 15 days</p>
            </div>

            <p style="text-align:center;color:#2e74b5;margin:8% 0">THANK YOU FOR YOUR BUSINESS</p>

            <div style="text-align:center;margin-bottom:1%;">
                <hr>
                <footer>
                    <p>Amrit AG (A wholly owned subsidiary of Innoplexus AG) |Email -<a href="mailto: info@amrit.ai" target="_blank" style="text-decoration:none"> <span
                            style="color:#005cf6;">info@amrit.ai</span></a>
                        <br><a href="https://amrit.ai/" style="text-decoration:none" target="_blank"><span
                        style="color:#005cf6;">www.amrit.ai</span></a>
                    </p>
                </footer>
            </div>
        </div>
    </div>
</body>

</html>`;
