# library-tool-rest

This project uses Quarkus, the Supersonic Subatomic Java Framework.

If you want to learn more about Quarkus, please visit its website: <https://quarkus.io/>.

## Running the application in dev mode

You can run your application in dev mode that enables live coding using:

```shell script
./mvnw quarkus:dev
```

## Inhaltsverzeichnis

1. [Einleitung](#einleitung)
2. [Projektbegründung](#projektbegründung)
3. [Projektplanung](#projektplanung)
    - [Projektphasen](#projektphasen)
    - [Ressourcenplanung](#ressourcenplanung)
    - [Entwicklungsprozess](#entwicklungsprozess)
4. [Analysephase](#analysephase)
5. [Lastenheft](#lastenheft)
6. [Entwurfsphase](#entwurfsphase)
    - [Datenbank-Entwurf](#datenbank-entwurf)
    - [UI-Entwurf](#ui-entwurf)
7. [Pflichtenheft](#pflichtenheft)
8. [Fazit](#fazit)
9. [Anhang](#anhang)
    - [Links](#links)

---

## Einleitung

Das **Bibliotheks-Tool** wurde entwickelt, um die Organisation und Verwaltung einer kleinen Bibliothek zu erleichtern. Es ermöglicht Administratoren, Autoren und Bücher anzulegen sowie neue Mitglieder zu registrieren. Jedes Mitglied erhält dabei eine eindeutige Mitglieder-ID, die zur Identifikation und zur Buchausleihe dient. Die Ausleihe erfolgt für eine festgelegte Dauer mit verpflichtender Rückgabe. Das Ziel ist eine transparente, effiziente und benutzerfreundliche Verwaltung von Büchern, Autoren, Mitgliedern und Ausleihen – sowohl für Administratoren als auch Bibliotheksnutzer.

---

## Projektbegründung

Dieses Tool entstand im Rahmen eines Schulprojekts und baut auf einem bereits existierenden Datenbankprojekt auf. Die bestehende Datenbankstruktur diente als Grundlage für die Implementation der Bibliotheksverwaltungs-Funktionen.

---

## Projektplanung

Im Folgenden wird die Planung mit ihren Phasen, Ressourcen und dem gewählten Entwicklungsprozess beschrieben.

### Projektphasen

Die von der IHK empfohlenen 80 Stunden Projektzeit wurden auf die einzelnen Phasen aufgeteilt. Jeder Phase sind typische Aktivitäten und geplante Zeitaufwände zugeordnet. Details zur Zeitaufteilung sind tabellarisch dokumentiert (siehe Anhang).

### Ressourcenplanung

Für die Realisierung wurde folgende Infrastruktur und Software verwendet:

- **Arbeitsplatz:** Windows 11 PC mit Intel i5, 64 GB RAM, 512 GB SSD
- **Entwicklungsumgebung Backend:** JetBrains IntelliJ IDEA Ultimate, Java (OpenJDK), [Quarkus](https://quarkus.io/)
- **Entwicklungsumgebung Frontend:** Visual Studio Code, [Angular 20](https://angular.dev/)
- **Datenbank:** Bestehendes relationales Modell

### Entwicklungsprozess

Das Projekt orientiert sich am **V-Modell**. Jede Entwicklungsphase wurde durch systematische Tests unterstützt, um Datenqualität und Zuverlässigkeit zu sichern und Fehler frühzeitig zu erkennen.

---

## Analysephase

Zu Beginn wurde die Ist-Situation analysiert: Ziel war es, ein benutzerfreundliches Tool auf Basis der bereits bestehenden Datenbank zu entwickeln. Die Hauptfunktionen:

- Autoren anlegen und verwalten
- Bücher mit Titel, Erscheinungsdatum u.a. erfassen und Autoren zuordnen
- Mitglieder (mit persönlichen Daten) anlegen; automatische Vergabe einer eindeutigen Mitglieder-ID
- Buchausleihe durch Mitglieder mit festgelegter Dauer (30 Tage), Speicherung des Ausleihdatums, Rückgabefrist und Übersicht

---

## Lastenheft

**Ziel:** Entwicklung eines webbasierten Tools zur Verwaltung einer kleinen Bibliothek, aufbauend auf einer bestehenden Datenbank. Die Benutzeroberfläche ermöglicht Administration und Nutzung für Autoren, Bücher, Mitglieder und Ausleihen. Das ursprüngliche Datenbankprojekt wird zu einem vollständigen, alltagstauglichen System mit UI, erweiterter Funktionalität und Bedienkomfort.

---

## Entwurfsphase

In der Entwurfsphase entstanden:

- Entwurf Datenmodell (Datenbank, Beziehungen)
- Systemarchitektur (Frontend/Backend)
- Mockups für die Benutzeroberfläche
- Technisches Konzept (siehe Pflichtenheft)

### Datenbank-Entwurf

Die Datenbank bildet ein klassisches Bibliothekssystem ab:

- `autor`: Basisdaten der Autoren (1:n-Beziehung zu `book`)
- `book`: Bibliografische Daten, Fremdschlüssel auf `autor`, 1:n zu `Ausleiher`
- `Mitglieder`: Nutzerinformationen, kann mehrere Ausleihen haben (1:n zu `Ausleiher`)
- `Ausleiher`: Verknüpft Buch und Mitglied, speichert Ausleih- und Rückgabedatum (zentrale Relation)

Das Modell gewährleistet effizientes Verwalten von Büchern, Autoren, Mitgliedern und Ausleihen.

### UI-Entwurf

Das Interface ist **benutzerfreundlich und responsiv** gestaltet. Eine beispielhafte Skizze findet sich im Anhang.

---

## Pflichtenheft

**Technische Umsetzung:**

- **Frontend:** Angular (responsive, Formularprüfungen, klare Fehlermeldungen)
- **Backend:** Java (OpenJDK) mit Quarkus, REST-Schnittstellen
- **Datenbank:** Relationale Datenbank (Tabellen: Autor, Book, Mitglieder, Ausleiher)

**Funktionalitäten:**

- **Bücher & Autoren anlegen:** Formular-Eingabe, Validierung, Speicherung via REST
- **Mitgliederverwaltung:** Erfassung, Validierung, automatische ID-Vergabe
- **Übersichten:** Übersichtstabellen für Bücher, Mitglieder, Autoren; Ausleihstatus sichtbar; Such- und Filtermöglichkeiten geplant
- **Ausleihe & Rückgabe:** Zuordnung Buch ↔ Mitglied, Speicherung der Vorgänge, Historie aller Ausleihen
- **Detailansichten & Bearbeitung:** Einzelansicht, Bearbeitung/Löschen mit Sicherheitsabfrage
- **Bedienkomfort:** Responsive Design, klare Erfolgsmeldungen, präzise Fehlermeldungen

---

## Fazit

Das Projekt wurde erfolgreich umgesetzt. Alle Kernanforderungen wie Datensatzverwaltung, Validierung und übersichtliche Darstellung wurden realisiert. Besonders lehrreich war die Implementierung der REST-Schnittstelle zwischen Angular-Frontend und Quarkus-Backend. Herausforderungen im Deployment konnten durch Analyse und Rücksprache gelöst werden. Optimierungen wie Sicherheitsabfragen beim Löschen erhöhen die Zuverlässigkeit.

**Zukünftige Erweiterungen (geplant):**
- Login-Seite mit Rollen- und Rechteverwaltung
- Erweiterte Such-/Filterfunktionen in den Übersichten
- Detaillierte Historienansicht vergangener Ausleihvorgänge

---

## Anhang

### Links

- [Quarkus Getting Started](https://quarkus.io/guides/getting-started)
- [Angular Tutorials](https://angular.dev/tutorials/first-app)
- [DrawDB (Datenbankmodellierung)](https://www.drawdb.app/editor)
- [Draw.io (UML & Mockups)](https://www.drawio.com/)
- [Lastenheft vs. Pflichtenheft](https://www.dreher-consulting.com/de/einblicke/lastenheft-versus-pflichtenheft/)
- [Angular & Quarkus REST Demo (YouTube)](https://youtu.be/FAtFMgodaPc?si=05rxPnapTZ8L7m2g)

---
