//TODO:Ovako cemo da ostavljamo taskove!

===========================TODOS===========================
//TODO: Skini docker

//TODO: u root-u projekta napravi .env fajl i zalepi ovo:
DYNAMO_ENDPOINT=http://localhost:8000
ACCESS_KEY_ID=local
SECRET_ACCESS_KEY_ID=local
p.s. stavio sam .env u .gitignore da ne komitujem kredencijale slucajno

//TODO: aplikacija se pokrece sa npm run start

//TODO: Pokreni ovu komandu u terminalu

docker run -d --name dynamodb \
 -p 8000:8000 \
 -v dynamodb_data:/home/dynamodblocal/data \
 amazon/dynamodb-local:latest \
 -jar DynamoDBLocal.jar -sharedDb

ovo ce da ti podigne dynamo kontejner, kad otvoris docker desktop aplikaciju videces zeleni kruzic da radi, kad zavrsis rad samo klikni stop da zaustavis kontejner, da ti ne jede ram i cpu.

Svaki sledeci put samo kliknes play button i podigao si ga

//TODO: Ovo ti je komanda da vratis sve elemente iz baze
aws dynamodb scan --table-name Knjiga --endpoint-url http://localhost:8000
ovo roknes u terminal, ima i neki UI amazonov za dynamo, istrazicu, dok to ne resimo koristicemo ove cli komande.

//TODO: baci pogled na models/Knjiga.mjs, tako se kreiraju modeli, slobodno kreni da pravis druge modele (svaki model poseban fajl) i modifikuj kako ti treba

//TODO: uglavnom ovo ce nam biti template, samo ispostuj ovaj flow router->controller(u kontroleru sva logika)

//TODO: I brisi ove todove koje uradis, i slobodno ostavi i ti meni

#Build imagea
docker build -t my-library-backend:1.0 .

#Pokretanje kontejnera:
docker run -d \
 --name my-library-backend \
 --network my-library-network \
 --restart unless-stopped \
 -p 3000:3000 \
 -v "$PWD/src:/app/src" \
 my-library-backend:1.0
