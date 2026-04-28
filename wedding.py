import qrcode

website_url = "https://example.com"  # your url

qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=10,
    border=4,
)

qr.add_data(website_url)
qr.make(fit=True)

img = qr.make_image(fill_color="black", back_color="white")
img.save("wedding_qr.png")
print("QR code generated and saved as 'wedding_qr.png'.")