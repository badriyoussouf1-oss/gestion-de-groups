export default function Connexion() {
  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="w-100 px-4 px-md-5" style={{ maxWidth: "650px" }}>
            <h2 className="fw-bold mb-2">Connexion Professeur</h2>
            <p className="text-secondary mb-4">
              Connectez-vous pour accéder à votre tableau de bord
            </p>
            <form>
              <div className="mb-3">
                <label className="form-label fw-semibold">Adresse e-mail</label>
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input type="email" className="form-control" placeholder="professor@ec2lt.edu"/>
                </div>
              </div>
              <div className="mb-4">
                <label className="form-label fw-semibold">Mot de passe</label>
                <div className="input-group rounded-5">
                  <span className="input-group-text bg-white"><i className="bi bi-lock"></i></span>
                  <input type="password" className="form-control" placeholder="••••••••"/>
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-100 py-3 fw-semibold d-flex justify-content-center align-items-center gap-2">
                Se connecter
                <i className="bi bi-arrow-right"></i>
              </button>
            </form>
            <p className="text-secondary text-center small mt-4">Informations d'identification de démonstration :<br />n'importe quel e-mail et mot de passe</p>
          </div>
        </div>
        <div className="col-md-6 d-none d-md-flex bg-primary text-white flex-column justify-content-center align-items-center p-5">
          <div className="mb-4">
            <div className="bg-white bg-opacity-25 rounded-4 p-4 d-inline-flex">
              <i className="bi bi-mortarboard fs-1"></i>
            </div>
          </div>
          <h1 className="fw-bold text-center mb-3">
            Responsable du groupe étudiant
          </h1>
          <p className="text-center opacity-75 fs-5 mb-5">
            Organisez efficacement vos étudiants en groupes collaboratifs
            grâce à notre système de gestion intuitif.
          </p>
          <div className="bg-white bg-opacity-10 rounded-4 p-3 d-flex align-items-center gap-3">
            <div className="d-flex">
              <i className="bi bi-person-circle fs-4"></i>
              <i className="bi bi-person-circle fs-4 ms-n2"></i>
              <i className="bi bi-person-circle fs-4 ms-n2"></i>
              <i className="bi bi-person-circle fs-4 ms-n2"></i>
            </div>
            <span className="small">
              Rejoignez 500+ professeurs gérant des groupes d'étudiants
            </span>
          </div>
        </div>
        
      </div>
    </div>
  );
}
