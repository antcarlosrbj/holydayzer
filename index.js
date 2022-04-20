import express from 'express';

const app = express();



/* --------------------------- HOLIDAYS --------------------------- */

    /* Resposta do servidor */
const holidays = [
    { date: "1/1/2022", name: "Confraternização mundial" },
    { date: "1/3/2022", name: "Carnaval" },
    { date: "4/17/2022", name: "Páscoa" },
    { date: "4/21/2022", name: "Tiradentes" },
    { date: "5/1/2022", name: "Dia do trabalho" },
    { date: "6/16/2022", name: "Corpus Christi" },
    { date: "9/7/2022", name: "Independência do Brasil" },
    { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
    { date: "11/2/2022", name: "Finados" },
    { date: "11/15/2022", name: "Proclamação da República" },
    { date: "12/25/2022", name: "Natal" }
];

    /* get */
app.get("/holidays", (req, res) => {
    res.send(holidays);
});



/* ----------------------- IS TODAY HOLIDAY ----------------------- */

    /* Recebendo a data de hoje e transformando em string */
const todayDate = new Date();
const today = `${todayDate.getMonth()+1}/${todayDate.getDate()}/${todayDate.getFullYear()}`;

    /* Resposta do servidor */
let isTodayHoliday = "Não, hoje não é feriado";

holidays.forEach(holiday => {
    if(holiday.date === today) {
        isTodayHoliday = `Sim, hoje é ${holiday.name}`;
    }
});

    /* get */
app.get("/is-today-holiday", (req, res) => {
    res.send(isTodayHoliday);
});



/* ---------------------------- MONTH ----------------------------- */

function holidaysThisMonth(month){

    /* Atende ao critério [1, 12]? */
    if(month < 1 || month > 12) {
        return "Este não é um mês válido"
    }

    /* Filtra a array holidays deixando os que estão no mes referido */
    return holidays.filter(holiday => {
        if(holiday.date.replace(/\W\d*\W\d*/, "") == month) { // "4/20/2022".replace(/\W\d*\W\d*/, "") -> "4"
            return true;
        }
    })
}

/* get */
app.get("/holidays/:month", (req, res) => {
    const month = req.params.month;
    const holidaysMonth = holidaysThisMonth(month);
    res.send(holidaysMonth);
});



/* ---------------------------------------------------------------- */

app.listen(5000);