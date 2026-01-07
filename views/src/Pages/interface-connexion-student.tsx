import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ConnexionEtudiant() {
  const navigation = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:3000/ec2lt_groupe/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Erreur de connexion");
      return;
    }

    localStorage.setItem('token', data.token);

    navigation('/student/dashboard');

  } catch (error) {
    console.error(error);
    alert("Erreur serveur");
  }
}


  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">

        {/* COLONNE GAUCHE */}
        <div className="col-md-6 d-none d-md-flex bg-warning flex-column justify-content-center align-items-center text-dark p-5">
          <div className="mb-4">
            <div className="bg-dark bg-opacity-10 rounded-circle p-2 d-inline-flex" style={{ width: 180, height: 180 }}>
              <img src="/ec2lt.jpeg" alt="ec2lt" className="rounded-circle " />
            </div>
          </div>

          <h1 className="fw-bold text-center mb-3">EC2-<span className="text-light">LICENCE</span></h1>

          <p className="text-center fs-5 mb-5">
            Rejoignez votre groupe d’étude assigné et collaborez avec
            d’autres étudiants sur des projets passionnants.
          </p>

          <div className="bg-dark bg-opacity-10 rounded-4 p-3 d-flex align-items-center gap-3">
            <div className="d-flex">
              <i className="bi bi-laptop fs-4"></i>
              <i className="bi bi-pencil fs-4 ms-n2"></i>
              <i className="bi bi-mortarboard fs-4 ms-n2"></i>
              <i className="bi bi-lightbulb fs-4 ms-n2"></i>
            </div>
            <span className="small">
              Rejoignez des milliers d’étudiants en apprentissage collaboratif
            </span>
          </div>
        </div>

        {/* COLONNE DROITE */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="w-100 px-4 px-md-5" style={{ maxWidth: "650px" }}>
            <h2 className="fw-bold mb-2">Connexion Étudiant</h2>
            <p className="text-secondary mb-4">Accédez à votre tableau de bord et rejoignez un groupe</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Adresse e-mail</label>
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input type="email" className="form-control" placeholder="etudiant@ec2lt.edu" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
              </div>

              {/* PASSWORD */}
              <div className="mb-4">
                <label className="form-label fw-semibold">Mot de passe</label>
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input type="password" className="form-control" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
              </div>
              <button type="submit" className="btn btn-warning w-100 py-3 fw-semibold d-flex justify-content-center align-items-center gap-2">
                Se connecter
                <i className="bi bi-arrow-right"></i>
              </button>
            </form>

            <p className="text-secondary text-center small mt-4">
              Veuillez saisir votre e-mail et votre mot de passe.
              <br />
              Informations enregistrées préalablement par le professeur.
            </p>

            <p className="text-center mt-3">
              <a href="/professor/connexion" className="text-decoration-none fw-semibold">
                Vous êtes professeur ? Connectez-vous ici
              </a>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}
