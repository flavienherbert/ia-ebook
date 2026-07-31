export default function DemandeEnvoyeePage() {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <h1 className="text-2xl font-bold">Ta demande est en cours de vérification</h1>
      <p className="max-w-md text-white/60">
        Un modérateur va la relire avant toute publication. Si elle est
        approuvée, un post sera généré et partagé sur Instagram. Tu ne
        recevras pas de notification automatique.
      </p>
    </div>
  );
}
