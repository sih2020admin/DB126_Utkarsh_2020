# from flask import Flask,send_file,render_template,request,jsonify
# from flask_cors import CORS,cross_origin
import os,sys,datetime
from cryptography.hazmat import backends
from cryptography.hazmat.primitives.serialization import pkcs12
from endesive import pdf
from PIL import Image, ImageDraw, ImageFont


# app= Flask("__name__")
# CORS(app,support_credentials=True)

# @app.route('/index')
# def index():
#    return render_template('index.html')

# @app.route("/sign", methods=["POST"])
# @cross_origin(app,support_credentials=True)
def sign_pdf(name , email , reason , location , filename , hash):
#    name = request.form['name']
   # print("request ",name)
#    email = request.form['email']
#    reason = request.form['reason']
#    location = request.form['location']
#    file = request.files['file']

#    file.save(os.getcwd()+"/uploaded_documents/"+file.filename)

   daten = datetime.datetime.utcnow() - datetime.timedelta(hours=12)
   date = daten.strftime('%Y%m%d%H%M%S+00\'00\'')
   date2 = daten.strftime('%Y/%m/%d')  

   background = Image.new('RGBA', (650, 650), color=(255, 255, 255, 0))
   font = ImageFont.truetype("routes/sign_req/Roboto-Regular.ttf", 30)
   chota_font = ImageFont.truetype("routes/sign_req/Roboto-Regular.ttf", 15)
   sign_font = ImageFont.truetype("routes/sign_req/Tomatoes.ttf", 60)
   ew, eh = font.getsize(email)
   sw, sh = sign_font.getsize(name)
   rw, rh = font.getsize(reason)
   lw, lh = font.getsize(location)
   dw, dh = font.getsize(date2)
   hw , hh = chota_font.getsize(hash)

   draw = ImageDraw.Draw(background)

   draw.text(((650-sw)/2, 100), name, font=sign_font, fill="#663EFD")
   draw.text(((650-ew)/2, 250), email, font=font, fill="#663EFD")
   draw.text(((650-rw)/2, 290), reason, font=font, fill="#663EFD")
   draw.text(((650-lw)/2, 330), location, font=font, fill="#663EFD")
   draw.text(((650-dw)/2, 370), date2, font=font, fill="#663EFD")
   draw.text(((650-hw)/2, 410), hash, font=chota_font, fill="#663EFD")

   background.save('routes/sign_req/sig.png')
   dct={
   b'sigflags': 3,
   # b'sigpage': 0,
   b'sigbutton': True,
   b'signature_img': b'routes/sign_req/sig.png',
   b'contact': name.encode(),
   b'location': location.encode(),
   b'signingdate': date.encode(),
   b'reason': reason.encode(),
   b'signature': name.encode(),
   b'hash': hash.encode(),
   b'signaturebox': (450, 700, 600,850),
   }
   with open('routes/sign_req/certificate.p12', 'rb') as fp:
    	p12 = pkcs12.load_key_and_certificates(fp.read(), b'',backends.default_backend())
   fname = 'routes/uploaded_documents/' + filename
   # if len (sys.argv) > 1:
	   # fname = sys.argv[1]
   datau = open(fname, 'rb').read()
   datas = pdf.cms.sign(datau, dct,
      p12[0],
      p12[1],
      p12[2],
      'sha256'
   )
   fname = fname.replace('.pdf', '_signed.pdf')
   with open(fname, 'wb') as fp:
      fp.write(datau)
      fp.write(datas)
   return fname


name = str(sys.argv[1])
email = str(sys.argv[2])
reason = str(sys.argv[3])
location = str(sys.argv[4])
filename = str(sys.argv[5])
hash = str(sys.argv[6])

# print(name)
print(sign_pdf(str(name) ,str(email) ,str(reason) , str(location) , str(filename),str(hash)))


# if __name__ == "__main__":
#    app.run(host="192.168.0.6",port="8091",debug=True,ssl_context=('certificate.crt','key.pem'))
