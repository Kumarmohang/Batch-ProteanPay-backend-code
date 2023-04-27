export const txReceiptTemplate: any = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>paymentPdf</title>
    <style>
        * {
            font-family: arial !important;
        }

        .table1 {
            font-family: arial !important;
            border-collapse: collapse;
            table-layout: fixed;
            width: 100%;
        }

        .table2 {
            font-family: arial !important;
            border-collapse: collapse;
            table-layout: fixed;
            border: 1px solid #2e74b5;
            width: 100%;
        }

        .table3 {
            font-family: arial !important;
            border-collapse: collapse;
            table-layout: fixed;
            width: 100%;
        }

        p {
            font-size: 15px
        }

        .table1 td,
        th {
            padding: 20px;
            font-size: 15px;
        }

        .table2 td,
        th {
            padding: 10px;
            font-size: 15px;
        }

        .table3 td,
        th {
            padding: 20px;
            font-size: 15px;
        }

        .table2 td {
            border: 1px solid #2e74b5;
        }

        .table1 tr {
            border: 1px solid #2e74b5;
            font-size: 15px;
        }

        .table-header2 {
            width: 15%;
            text-align: left;
            word-wrap:break-word;
        }

        .table-last-row {
            text-align: right;

        }

        .txnHashOverflow {
            word-wrap: break-word;
        }
    </style>
</head>

<body>
    <div class="outterContainer">
        <div style="padding:3% 5%">
            <div style="display:flex;justify-content: space-between;">
                <div style="width:60%;">
                    <h3 style="color:#595959;font-size:19px">Amrit AG</h3>
                    <p>{{transaction.from}}</p>
                </div>
                <div style="width:40%;text-align:right">
                    <h1 style="color:#2e74b5;font-weight:bold;font-size: 40px;">Receipt</h1>
                    <p>
                        <span style="color:#2e74b5;font-weight:bold">Receipt No</span>
                        <span> {{transaction.id}}</span>
                    </p>
                    <p>
                        <span style="color:#2e74b5;font-weight:bold">Date</span>
                        <span>{{transaction.formattedDate}}</span>
                    </p>
                </div>

            </div>


            <div style="display:flex;justify-content: space-between;margin-bottom:2%;">
                <div style="width:60%;">
                </div>
                <div style="width:40%;text-align:right;">
                    
                </div>
            </div>

            <div style="display:flex;margin-bottom:4%;">
                <div style="width:60%;">
                    <p>
                        <span style="color:#2e74b5;font-weight:bold">Payer</span>
                    </p>
                    <p>{{transaction.payer.email}}</p>
                    <p>{{transaction.payer.payerText}}</p>
                </div>
                <div style="width:40%;text-align:right;">
                    <p>
                        <span style="color:#2e74b5;font-weight:bold">For</span>
                        <span> {{directory.name}}</span>
                    </p>
                    <p>
                        <span style="color:#2e74b5;font-weight:bold">Project Code</span>
                        <span>{{directory.customDirectoryIdentifier}}</span>
                    </p>
                </div>

            </div>

            <div>
                <table class="table1">
                    <tr style="border-bottom: 2.5px solid #2e74b5">
                        <th style="width:15%">Invoice Number</th>
                        <th class="table-header2">Receipient Wallet Address</th>
                        <th class="width:30%;text-align:left;">Invoice Date</th>
                        <th style="width:40%;text-align:right;">Amount(AMRT)</th>
                    </tr>
                    {{RECEIPT_ITEMS}}
                    <tr>
                        <td style="color:#2e74b5;font-weight: bold"></td>
                        <td></td>
                        <td></td>
                        <td class="table-last-row"><span style="color:#2e74b5;font-weight:bold;">Protean Pay Fees(AMRT)
                                :</span>
                            0</td>
                    </tr>
                    <tr>
                        <td style="color:#2e74b5;font-weight: bold"></td>
                        <td></td>
                        <td></td>
                        <td class="table-last-row"><span style="color:#2e74b5;font-weight:bold;">Total Amount(AMRT)
                                :</span>
                            {{TOTAL_TOKEN_AMOUNT}}</td>
                    </tr>
                </table>
            </div>
            <div style="margin-top:3%">
                <p style="color:#2e74b5;font-weight:bold">Ether / Gas Fee Details:</p>
                <table class="table2">
                    <tr>
                        <td style="width:30%">Transaction Hash</td>
                        <td style="font-size:11px;width: 70%">
                            <a style="color:black" href="https://goerli.etherscan.io/tx/{{transaction.txHash}}" target="_blank" >{{transaction.txHash}}</a>
                        </td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td style="color:#4ee2df">{{transaction.paymentStatus}}</td>
                    </tr>
                    <tr>
                        <td>Block</td>
                        <td>{{transaction.blockNo}}</td>
                    </tr>
                    <tr>
                        <td>Timestamp</td>
                        <td>{{TIMESTAMP}}</td>
                    </tr>
                </table>

            </div>

            <div style="margin-top:5%">
                <table class="table3">
                    <tr>
                        <th style="width:25%;"></th>
                        <th style="width:75%;"></th>
                    </tr>
                    <tr>
                        <td>From: </td>
                        <td style="color:#69cbf5">{{transaction.callerAddress}}</td>
                    </tr>
                    <tr>
                        <td>Interacted With (To): </td>
                        <td>Contract <span style="color:#69cbf5">0xEd02847b99C6331f3b58aa79714B361Bd629B91C</span></td>
                    </tr>
                    <tr>
                        <td>Blockchain</td>
                        <td>{{transaction.blockchainName}}</td>
                    </tr>
                    <tr>
                        <td>Gas Fee</td>
                        <td>{{transaction.gasFee}} ETH({{GUI_VALUE}} Gwei)</td>
                    </tr>
                </table>

            </div>

            <p style="text-align:center;color:#2e74b5;margin:8%">THANK YOU FOR YOUR BUSINESS</p>
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
