# Sistema de Reserva de Cinema (Parnaíba)

Este projeto é um sistema web fullstack para a reserva online de poltronas de cinema. O projeto foi desenvolvido para modernizar o processo de compra de ingressos em um cinema local, substituindo a necessidade de compra exclusivamente presencial.

A plataforma permite que os usuários consultem os filmes em cartaz, visualizem o mapa de assentos da sala em tempo real e escolham seus lugares com antecedência, recebendo um comprovante digital da reserva.

## Visão Geral da Arquitetura

O projeto utiliza uma arquitetura desacoplada ("headless"), com um backend em Django servindo uma API RESTful e um frontend em Vue.js consumindo essa API.

* **Backend:** Django REST Framework
* **Frontend:** Vue.js

---

## Tecnologias Utilizadas

### Backend
* Python 3
* Django
* Django REST Framework (DRF)
* DRF Token Authentication (para autenticação de API)
* Django CORS Headers (para comunicação entre domínios)

### Frontend
* Vue.js 3 (Composition API com `<script setup>`)
* Vue Router
* Axios (para requisições HTTP)
* Bootstrap 5 (para estilização e layout)

---

## Funcionalidades Principais

* **Autenticação de Usuário:** Sistema completo de Registro (`/api/registro/`) e Login (`/api/login/`) via Token.
* **Listagem de Filmes:** O backend expõe uma lista de filmes em cartaz.
* **Visualização de Sessões:** O frontend consome os filmes e exibe as sessões (horários) disponíveis para cada um.
* **Mapa de Assentos Interativo:** Ao selecionar uma sessão, o sistema carrega o mapa da sala, diferenciando visualmente poltronas livres, ocupadas e selecionadas.
* **Reserva Segura:** A rota de criação de reserva (`/api/reservas/`) é protegida e exige um Token de autenticação, garantindo que apenas usuários logados possam reservar.
* **Gerenciamento via Admin:** O Django Admin (`/admin/`) vem pré-configurado para que o administrador possa cadastrar novos Filmes, Salas, Poltronas e Sessões.
