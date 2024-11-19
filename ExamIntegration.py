#Jalen Shavers
#Register

from html.parser import HTMLParser

class MyHTMLParser(HTMLParser):
    def handle_starttag(self, tag, attrs):
        print("Encountered a start tag:", tag)
        if 

    def handle_endtag(self, tag):
        print("Encountered an end tag :", tag)

    def handle_data(self, data):
        print("Encountered some data  :", data)

parser = MyHTMLParser()

with open("C:\\Users\jalen\Downloads\Register.html", mode="r", encoding="utf-8") as html_file:
    html_content = html_file.read()
    print(html_content)

parser.feed(html_content)
    
#with open("C:\\Users\jalen\Downloads\Register.html", mode="r", encoding="utf-8") as html_file:
#    html_content = html_file.read()
#    print(html_content)

#parser = emailParser()
#parser.feed(html_content)

print("Full run")
