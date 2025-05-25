# Indítás

A projekt Angular CLI-t és npm-et használ.
A backend és frontend külön indítható a hozzájuk tartozó mappákból, így a kezdeti mappából 2 külön terminállal a következő:

Backend (terminal #1):
```bash
 $ cd backend
 $ docker compose up -d #Windows-on: docker-compose up -d
 $ npm start
```

Frontend (terminal #2):
```bash
 $ cd frontend
 $ ng serve
```

Az Angular frontend-hez az alapértelmezett instrukciók a ./frontend/README.md fájlban találhatók.

## Továbbiakban

A teljesség jegyében érdemes lehet ezt lecserélni egy NX vagy más monorepo manage-elő rendszerre, amivel egyben indítható a backend és frontend (főleg ha a backend a továbbiakban is csak ezt a fronted-et szolgálja ki) - ezt a gyorsabb feladatmegoldásért most kihagytam.