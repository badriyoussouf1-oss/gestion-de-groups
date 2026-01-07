import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container py-4">

      <div className="text-center mb-5">
        <h1 className="fw-bold display-5">
          Responsable du groupe étudiant
        </h1>
        <p className="text-secondary fs-5 mt-3">
          Organiser efficacement les étudiants en groupes d'étude collaboratifs
        </p>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <Link to="/professor/connexion" className="text-decoration-none text-dark">
            <div className="card h-100 shadow border-0 rounded-4 p-4 hvr-float-shadow">
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div className="bg-primary text-white rounded-3 d-flex align-items-center justify-content-center p-3">
                  <i className="bi bi-mortarboard fs-3"></i>
                </div>
                <i className="bi bi-arrow-right fs-4 text-secondary"></i>
              </div>
              <h3 className="fw-bold mb-3">Professeur</h3>
              <p className="text-secondary mb-4">
                Créez et gérez des groupes d'étudiants, consultez les inscriptions
                et organisez votre cours.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <span className="badge rounded-pill bg-light text-dark px-3 py-2">Créer des groupes</span>
                <span className="badge rounded-pill bg-light text-dark px-3 py-2">Voir les étudiants</span>
                <span className="badge rounded-pill bg-light text-dark px-3 py-2">Gérer</span>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-6">
          <Link to="/student/connexion" className="text-decoration-none text-dark">
            <div className="card h-100 shadow border-0 rounded-4 p-4 hvr-float-shadow">
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div className="bg-warning text-dark rounded-3 d-flex align-items-center justify-content-center p-3">
                  <i className="bi bi-book fs-3"></i>
                </div>
                <i className="bi bi-arrow-right fs-4 text-secondary"></i>
              </div>
              <h3 className="fw-bold mb-3">Étudiant</h3>
              <p className="text-secondary mb-4">
                Rejoignez votre groupe d’étude assigné et collaborez avec d’autres
                étudiants.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <span className="badge rounded-pill bg-warning-subtle text-warning px-3 py-2">Rejoignez le groupe</span>
                <span className="badge rounded-pill bg-warning-subtle text-warning px-3 py-2">Affectation automatique</span>
                <span className="badge rounded-pill bg-warning-subtle text-warning px-3 py-2">Collaborer</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <p className="text-center text-secondary pt-4 mt-4">
        Sélectionnez votre rôle pour continuer
      </p>
    </div>
  );
}
