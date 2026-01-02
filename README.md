# Cona dogodkov

## Splošno

**Cona dogodkov** je spletna aplikacija za pregledovanje in upravljanje dogodkov. 
Ospredni del aplikacije (angl. frontend) je razvit v **Angular 21**, zaledni del (angl. backend) pa **Express.js**. 
Aplikacija omogoča enostaven dostop do informacij o dogodkih tako splošnim uporabnikom kot tudi administratorjem.

### Funkcionalnosti

#### Uporabniki brez računa
- Ogled vseh razpoložljivih dogodkov
- Iskanje dogodkov po **naslovu**

#### Administratorji
- Dodajanje novih dogodkov
- Urejanje obstoječih dogodkov
- Brisanje dogodkov


```text
Uporabnik 1 (administrator)
username: franci
password: test1234

Uporabnik 2 (administrator)
username: marjan123
password: test1234
```

## Tehnične podrobnosti


### Verzije

Projekt uporablja naslednjo verzijo NodeJS.

```bash
node --version # v25.2.1
npm --version # 11.6.2
```

### Konfiguracija

`ui` ... uporablja vite

### Dodatno

samo `ui`: formatiranje kode prettier

```bash
npx prettier . --write
```