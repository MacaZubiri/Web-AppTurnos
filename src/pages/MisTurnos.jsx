const MisTurnos = () => {
  return (
    <>
    <div className="bg-amber-50 pt-4 pb-16 ml-24 mr-24  rounded-sm shadow-md mt-12">
    <h1 className="text-xl font-bold text-center">Mis turnos</h1>
    <table className="w-full max-w-4xl mx-auto mt-6 border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="px-4 py-2">Fecha</th>
          <th className="px-4 py-2">Horario</th>
          <th className="px-4 py-2">Profesional</th>
          <th className="px-4 py-2">Estado</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border px-4 py-2">10/10/2024</td>
          <td className="border px-4 py-2">10:00 - 10:30</td>
          <td className="border px-4 py-2">Dr. Juan Pérez</td>
          <td className="border px-4 py-2 text-center"> <span className="text-sm text-white font-medium border p-1.5 bg-green-600 rounded-sm">Confirmado</span></td>
        </tr>
        <tr>
          <td className="border px-4 py-2">15/10/2024</td>
          <td className="border px-4 py-2">14:00 - 14:30</td>
          <td className="border px-4 py-2">Dra. Ana Gómez</td>
          <td className="border px-4 py-2 text-center"> <span className="text-sm text-white font-medium border p-1.5 bg-red-500 rounded-sm">Cancelado</span></td>
        </tr>
        <tr>
          <td className="border px-4 py-2">15/10/2024</td>
          <td className="border px-4 py-2">14:00 - 14:30</td>
          <td className="border px-4 py-2">Dra. Ana Gómez</td>
          <td className="border px-4 py-2 text-center"> <span className="text-sm text-white font-medium border p-1.5  bg-blue-500 rounded-sm">Asistió</span></td>
        </tr>
        <tr>
          <td className="border px-4 py-2">15/10/2024</td>
          <td className="border px-4 py-2">14:00 - 14:30</td>
          <td className="border px-4 py-2">Dra. Ana Gómez</td>
          <td className="border px-4 py-2 text-center"> <span className="text-sm text-white font-medium border p-1.5  bg-gray-600 rounded-sm">Ausente</span></td>
        </tr>
        </tbody>
    </table>
  </div>
    </>)};

    export default MisTurnos;