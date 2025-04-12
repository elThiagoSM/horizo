const ReservationCallToAction = ({
  nombreEmpresa,
  esloganEmpresa,
  onMapClick,
  onReservarClick,
}) => {
  return (
    <section className="flex justify-between p-12 bg-white">
      <div className="max-w-6xl w-full m-auto flex flex-col justify-between items-center">
        <h2 className="text-4xl font-bold text-gray-800">{nombreEmpresa}</h2>
        <h3 className="text-lg text-gray-800/50 mb-6">{esloganEmpresa}</h3>
        <div className="flex justify-center space-x-6">
          <button
            onClick={onMapClick}
            className="px-16 py-3 bg-white border border-blue-600 text-blue-600 text-lg font-semibold rounded-4xl hover:bg-blue-50 transition cursor-pointer"
          >
            VER LOCAL
          </button>
          <button
            onClick={onReservarClick}
            className="px-16 py-3 bg-blue-600 text-white text-lg font-semibold rounded-4xl hover:bg-blue-700 transition cursor-pointer"
          >
            RESERVAR
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReservationCallToAction;
