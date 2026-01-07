import { useNavigate } from "react-router-dom"

export default function StudentPortal() {
    const navigate = useNavigate()
    function handleDeconnexion(){
        navigate('/student/connexion')
    }
  return (
    <div className="container-fluid px-4 py-3">
      <div className="d-flex justify-content-between align-items-center mb-5 fixed-top bg-light bg-opacity-75 container">
        <div className="d-flex align-items-center gap-3 p-3 ">
          <div className="bg-warning rounded-circle d-flex justify-content-center align-items-center"
               style={{ width: 50, height: 50 }}>
                <img src="/ec2lt.jpeg" alt="ec2lt" className="rounded-circle " />
          </div>
          <div>
            <h6 className="mb-0 fw-bold">EC2-<span className="text-warning">LICENCE</span></h6>
            <small className="text-muted">Bienvenue, Licence</small>
          </div>
        </div>
        <button onClick={handleDeconnexion} className="btn btn-danger rounded-pill p-2 text-decoration-none text-light ">
          <i className="bi bi-box-arrow-right me-1"></i>
          Se déconnecter
        </button>
      </div>

      <div className="text-center mt-5 pt-3 mb-5">
        <h1 className="fw-bold mb-3">Prêt à adhérer ?</h1>
        <p className="text-muted fs-5">
          Cliquez sur le bouton ci-dessous pour être automatiquement affecté à un groupe
          <br /> d'étude.
        </p>
      </div>

      <div className="d-flex justify-content-center mb-5">
        <div className="card shadow-sm p-4 text-center" style={{ maxWidth: 520 }}>
          <div className="mb-3">
            <div className="bg-warning bg-opacity-25 rounded-circle d-inline-flex justify-content-center align-items-center"
                 style={{ width: 70, height: 70 }}>
              <i className="bi bi-people text-warning fs-3"></i>
            </div>
          </div>

          <h5 className="fw-bold mb-2">Affectation automatique de groupe</h5>

          <p className="text-muted mb-4">
            Vous serez automatiquement affecté à un groupe d’étude disponible.
            <br />
            La sélection des groupes est gérée par votre professeur.
          </p>

          <button className="btn btn-warning fw-semibold px-4 py-2 mb-3">
            <i className="bi bi-stars me-2"></i>
            Rejoignez un groupe
          </button>

          <div className="text-muted small">
            <i className="bi bi-clock me-1"></i>
            L'affectation se fait automatiquement et instantanément
          </div>
        </div>
      </div>

      <div className="row justify-content-center g-3">
        <div className="col-md-4">
          <div className="card p-3 h-100">
            <div className="d-flex align-items-start gap-3">
              <div className="bg-light rounded-circle d-flex justify-content-center align-items-center"
                   style={{ width: 40, height: 40 }}>
                <i className="bi bi-person fs-5"></i>
              </div>
              <div>
                <h6 className="fw-bold mb-1">Taille du groupe</h6>
                <p className="text-muted small mb-0">
                  Chaque groupe compte un maximum de 4 étudiants
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 h-100">
            <div className="d-flex align-items-start gap-3">
              <div className="bg-success bg-opacity-25 rounded-circle d-flex justify-content-center align-items-center"
                   style={{ width: 40, height: 40 }}>
                <i className="bi bi-check-circle text-success fs-5"></i>
              </div>
              <div>
                <h6 className="fw-bold mb-1">Affectation équitable</h6>
                <p className="text-muted small mb-0">
                  Les groupes sont attribués automatiquement pour des raisons d'équité
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
