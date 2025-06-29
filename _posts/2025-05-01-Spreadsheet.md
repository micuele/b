---
layout: post
title: "Spreadsheets"
permalink: /spreadsheets/
category: text
---


Ich bin noch Geringverdiener, trotzdem dachte ich, ich brauche eine Übersicht, um mein Einkommen und meine Ausgaben zu verfolgen.
Ich mache das jetzt seit 3 Jahren, das hier ist meine aktuellste Version und die beste bisher.

Das hier ist die Übersichtsseite, auf der ich den Monat auswählen und sehen kann, was für mich am wichtigsten ist.

![Spreadsheet Home](/img/spreadsheet/1.png)

Ich importiere die Daten von meiner Bank, lasse sie in einer Liste darstellen und kategorisiere sie dann anhand des Zahlungsorts.

![Spreadsheet Data](/img/spreadsheet/2.png)


So sieht eine dieser Zellen aus:
```
=WENN(ODER(
  ISTZAHL(SUCHEN("aldi"; O3));
  ISTZAHL(SUCHEN("lidl"; O3));
  ISTZAHL(SUCHEN("rewe"; O3));
  ISTZAHL(SUCHEN("penny"; O3));
  ISTZAHL(SUCHEN("kaufland"; O3));
  ISTZAHL(SUCHEN("edeka"; O3));
  ISTZAHL(SUCHEN("netto"; O3));
  ISTZAHL(SUCHEN("hit"; O3));
  ISTZAHL(SUCHEN("real"; O3));
  ISTZAHL(SUCHEN("tegut"; O3));
  ISTZAHL(SUCHEN("denn's"; O3));
  ISTZAHL(SUCHEN("bio company"; O3));
  ISTZAHL(SUCHEN("rossmann"; O3));
  ISTZAHL(SUCHEN("dm"; O3));
  ISTZAHL(SUCHEN("müller"; O3));
  ISTZAHL(SUCHEN("getränke hoffmann"; O3));
  ISTZAHL(SUCHEN("famila"; O3));
  ISTZAHL(SUCHEN("e center"; O3));
  ISTZAHL(SUCHEN("markt"; O3));
  ISTZAHL(SUCHEN("späti"; O3))
); P3; "")
```
## Persönlich heißt persönlich
Personal Finance ist per Definition persönlich. Deshalb sollte man sich zuerst fragen: Was brauche ich wirklich, und wie viel Zeit will ich meinem Spreadsheet widmen?

Wenn man von Personal Finance-Spreadsheets spricht, kann man keine Fehler machen. Egal welches Layout man wählt, man wird auf jeden Fall die Fähigkeit erlernen, Excel zu benutzen.

In 2023 und 2024 hatte ich eine viel kompliziertere Tabelle.
Ich habe jede Transaktion manuell eingetragen und nach Konto und Kategorie sortiert.

Das war echt zeitaufwendig. Ich habe zwei Jahre lang akribisch mein Einkommen und meine Ausgaben verfolgt.
Irgendwann habe ich aufgehört, weil ich keinen wirklichen Nutzen gesehen habe und es außerdem langweilig war, jeden Eintrag manuell hinzuzufügen.

Im ersten Quartal 2025 habe ich deshalb nicht getrackt.
Zum Glück hat sich das /r/personalfinance in mir wieder gemeldet und ich habe meine Tabelle neu aufgebaut.
