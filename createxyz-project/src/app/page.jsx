"use client";
import React, { useState, useCallback, useEffect  } from 'react';

function MainComponent() {
  const [probes, setProbes] = useState([
    {
      id: 1,
      name: "Seahawks-Monitor-01",
      isConnected: true,
      lastScan: new Date().toISOString(),
      networkData: {
        hostname: "DESKTOP-N5ADTRB",
        interfaces: [
          {
            name: "Connexion au réseau local",
            status: "down",
            ipv4: "169.254.214.131/16",
            ipv6: ["fe80::30da:c826:d42c:36ad"],
          },
          {
            name: "Ethernet",
            status: "down",
            ipv4: "169.254.195.105/16",
            ipv6: ["fe80::6d43:6269:2e7e:82fc"],
          },
          {
            name: "Ethernet 3",
            status: "up",
            ipv4: "192.168.56.1/24",
            ipv6: ["fe80::c5e7:68f4:b067:fe6"],
          },
          {
            name: "Connexion au réseau local* 9",
            status: "down",
            ipv4: "169.254.137.50/16",
            ipv6: ["fe80::8563:9990:b97e:e2f7"],
          },
          {
            name: "Connexion au réseau local* 10",
            status: "down",
            ipv4: "169.254.218.142/16",
            ipv6: ["fe80::ac3:5b9d:16af:b785"],
          },
          {
            name: "Wi-Fi",
            status: "up",
            ipv4: "172.20.10.2/28",
            ipv6: [
              "2a02:8440:d106:3bcd:940d:9157:54de:c3d0",
              "2a02:8440:d106:3bcd:9916:335:8f5:fe5f",
              "fe80::18b1:f3dd:f176:68b6",
            ],
          },
          {
            name: "Connexion réseau Bluetooth",
            status: "down",
            ipv4: "169.254.50.127/16",
            ipv6: ["fe80::d7b5:18bc:99a1:bdee"],
          },
          {
            name: "OpenVPN Connect DCO Adapter",
            status: "down",
            ipv4: "169.254.195.200/16",
            ipv6: ["fe80::4cbe:1a20:e98f:9a5c"],
          },
          {
            name: "Loopback Pseudo-Interface 1",
            status: "up",
            ipv4: "127.0.0.1/8",
            ipv6: ["::1"],
          },
        ],
      },
    },
    {
      id: 2,
      name: "Seahawks-Monitor-02",
      isConnected: false,
      lastScan: new Date(Date.now() - 86400000).toISOString(),
      networkData: {
        hostname: "DESKTOP-N5ADTRB-2",
        interfaces: [],
      },
    },
  ]);
  const [selectedProbe, setSelectedProbe] = useState(null);
  const [scanInProgress, setScanInProgress] = useState(false);
  const [pingResult, setPingResult] = useState(null);
  const [ipAddress, setIpAddress] = useState("");
  const viewScanDetails = useCallback(
    (id) => {
      const probe = probes.find((p) => p.id === id);
      setSelectedProbe(probe);
    },
    [probes]
  );
  const startNetworkScan = useCallback(() => {
    setScanInProgress(true);
    setTimeout(() => {
      setScanInProgress(false);
    }, 2000);
  }, []);

  const pingServer = useCallback(() => {
    if (!ipAddress) {
      setPingResult("Veuillez saisir une adresse IP");
      return;
    }
    setPingResult("Test de connexion en cours...");
    setTimeout(() => {
      setPingResult(`Serveur ${ipAddress} accessible - Temps de réponse: 45ms`);
    }, 1000);
  }, [ipAddress]);

  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      <nav className="bg-[#1a56db] p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl text-white font-roboto">
            Seahawks Nester - Gestion des Sondes
          </h1>
        </div>
      </nav>

      <main className="container mx-auto p-4">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-roboto mb-4">
                Test de Connexion Serveur
              </h2>
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="ipAddress" className="font-roboto">
                    Adresse IP
                  </label>
                  <input
                    type="text"
                    id="ipAddress"
                    placeholder="Exemple: 192.168.1.1"
                    className="border rounded p-2 font-roboto"
                    onChange={(e) => setIpAddress(e.target.value)}
                    value={ipAddress}
                  />
                </div>
                <button
                  onClick={pingServer}
                  className="bg-[#1a56db] text-white px-4 py-2 rounded hover:bg-[#1e429f] font-roboto"
                >
                  Ping Serveur
                </button>
                {pingResult && <p className="mt-2 font-roboto">{pingResult}</p>}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-roboto mb-4">Scan Réseau</h2>
              <div className="mb-4">
                <button
                  onClick={startNetworkScan}
                  disabled={scanInProgress}
                  className="bg-[#1a56db] text-white px-4 py-2 rounded hover:bg-[#1e429f] font-roboto disabled:bg-gray-400"
                >
                  {scanInProgress ? (
                    <span className="flex items-center">
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Scan en cours...
                    </span>
                  ) : (
                    "Démarrer le scan"
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full">
              <thead className="bg-[#1a56db]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-roboto text-white">
                    Nom de la sonde
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-roboto text-white">
                    État
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-roboto text-white">
                    Dernier scan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-roboto text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {probes.map((probe) => (
                  <tr key={probe.id}>
                    <td className="px-6 py-4 font-roboto">{probe.name}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-roboto ${
                          probe.isConnected
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {probe.isConnected ? "Connectée" : "Déconnectée"}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-roboto">
                      {probe.lastScan
                        ? new Date(probe.lastScan).toLocaleString()
                        : "Aucun scan"}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => viewScanDetails(probe.id)}
                        className="text-[#1a56db] hover:text-[#1e429f] font-roboto"
                      >
                        Rapport de scan
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedProbe && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-roboto mb-4">
                Rapport de scan - {selectedProbe.name}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-roboto font-medium">Hostname</h3>
                  <p className="font-roboto">
                    {selectedProbe.networkData.hostname}
                  </p>
                </div>

                <div>
                  <h3 className="font-roboto font-medium mb-2">
                    Interfaces Réseau
                  </h3>
                  {selectedProbe.networkData.interfaces.map((iface, index) => (
                    <div key={index} className="mb-4 border-b pb-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-roboto">{iface.name}</h4>
                        <span
                          className={`px-2 py-1 rounded text-sm ${
                            iface.status === "up"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {iface.status}
                        </span>
                      </div>
                      <div className="mt-2 space-y-1 text-sm">
                        {iface.ipv4 && (
                          <p className="font-roboto">IPv4: {iface.ipv4}</p>
                        )}
                        {iface.ipv6 &&
                          iface.ipv6.map((ip, i) => (
                            <p key={i} className="font-roboto">
                              IPv6: {ip}
                            </p>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default MainComponent;