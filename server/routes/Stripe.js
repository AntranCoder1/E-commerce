const express = require("express")
const router = express.Router();
const KEY = "sk_test_51HhCMCGDnXAv257tCDvps640PgPgbX2bEBOZi9Ylqbdk7QyGyPS55xM6oxTF9susCp39DcFiFi2tkUSZxa8cgiOc007UMOSK82";
const stripe = require("stripe")(KEY);

router.post("/payment", (req, res) => {
    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "usd",
        },
        (stripeErr, stripeRes) => {
            if (stripeErr) {
                res.status(500).json(stripeErr);
            } else {
                res.status(200).json(stripeRes);
            }
        }
    );
  });

module.exports = router;