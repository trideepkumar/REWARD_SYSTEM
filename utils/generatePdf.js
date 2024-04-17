const PDFDocument = require('pdfkit');

// Function to generate PDF content for all coupons
module.exports = async function generatePDF(couponsData) {
    const pdfDoc = new PDFDocument();
    const buffers = [];
    pdfDoc.on('data', buffer => buffers.push(buffer));

    // Iterate over each coupon data and generate PDF content
    for (const coupon of couponsData) {
        const couponHtml = getCouponHTML(coupon);
        pdfDoc.addPage();
        pdfDoc.text(couponHtml, {
            align: 'left',
            paragraphGap: 10,
            wordBreak: false
        });
    }

    pdfDoc.end();
    return Buffer.concat(buffers);
}

// Function to generate HTML content for a single coupon
// Function to generate HTML content for a single coupon
function getCouponHTML(coupon) {
    // Generate HTML content for a single coupon based on coupon data
    return `
    <style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
  }

  .gift-cards-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    align-content: flex-start;
  }

  .gift-card {
    border-radius: 10px;
    background: #fafafa;
    width: calc(50% - 10px);
    color: #3d3d3d;
    display: flex;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.5);
  }

  .image {
    flex: 1;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .content {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .amount {
    font-size: 70px;
  }

  .amount-remaining {
    font-size: 14px;
    margin-top: 7px;
  }

  .code {
    background: white;
    color: black;
    padding: 10px 13px;
    margin-top: 20px;
    font-size: 18px;
    border: 1px solid #e3e3e3;
  }

  .msg {
    font-size: 10px;
    display: block;
    margin-top: 10px;
  }
</style>
<article class="gift-card">
<div class="image"><img src="https://cdn.shopify.com/s/files/1/2504/3282/files/annie-spratt-102799-unsplash.jpg?15904179471993750892" alt="Gift Image"></div>
<section class="content">
  <div class="amount">Rs. 100</div>
  <div class="amount-remaining">Rs. 200 remaining</div>
  <div class="code">1SD4 2R4G LOK1 XCV0</div>
  <div class="msg">Use this code at checkout to redeem your gift card</div>
</section>
</article>
    `;
}
