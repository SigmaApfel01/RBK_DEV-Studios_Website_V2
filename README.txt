RBK_DEV-Studios Website V2

1. Website
- Alle HTML/CSS/JS-Dateien liegen im Hauptordner.
- Dein echtes Logo nach images/logo.png kopieren.
- Für Bus Simulator Sachsen die drei fertigen Bilder als images/SneakPeek1.png, images/SneakPeek2.png und images/SneakPeek3.png einfügen.
- Die Roadmap ist auf Trello verlinkt.

2. Entbannungsanträge
GitHub Pages ist statisch und kann selbst keine PHP-/Node-/Server-Datei ausführen. Deshalb liegt der Mailversand in apps-script/Code.gs.

Einrichtung:
A) Google Apps Script öffnen und ein neues Projekt erstellen.
B) Den Inhalt von apps-script/Code.gs komplett einfügen.
C) Bereitstellen > Neue Bereitstellung > Web-App.
D) Ausführen als: dein Google-Konto. Zugriff: Jeder.
E) Die erzeugte Web-App-URL kopieren.
F) In script.js bei UNBAN_ENDPOINT die URL zwischen den Anführungszeichen einsetzen.
G) script.js auf GitHub aktualisieren.

Die Mail wird an rbk.dev.studios@gmail.com gesendet. Das Google-Konto-Passwort kommt NICHT in die Website.

3. GitHub Pages
index.html muss im veröffentlichten Ordner liegen. In GitHub: Settings > Pages > Deploy from a branch > main > /(root) > Save.

Nach Änderungen an GitHub kann die Veröffentlichung einige Minuten dauern.
