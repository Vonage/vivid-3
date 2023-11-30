@ECHO OFF
docker run -i --name vivid-visual-tests --rm -v %cd%:/usr/src/app drizzt99/vonage:2.2.0 %*
