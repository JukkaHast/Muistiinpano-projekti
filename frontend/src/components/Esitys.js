const Esitys = (props) => {

	return(
		<div>
			<h1>Aihe:</h1>
            <p>Sovellus jolla voisi kirjoittaa lyhyitä muistiinpanoja. Sisältää tageja joilla lajitella ja hakea.</p>
            <h1>Toteutus:</h1>
            <p>Tallentuu tietokantaan(Sqlite), Node backend ja frontti Reactilla. Käyttäjä/salasana järjestelmä opin vuoksi</p>
            <h1>Tilanne:</h1>
            <p>Backend toimii täysin CRUD toimintojen osalta, fronttia vain sen verran että tiedot ja toiminnot näkyy ja toimii, ulkoasu muuten yksinkertainen</p>
            <h1>Puutteita:</h1>
            <p>Erilaisia tarkistuksia puuttuu. Esimerkiksi tällä hetkellä tagin voi poistaa vaikka se olisi käytössä, ei hyvä.</p>

            

		</div>

	)
}

export default Esitys;