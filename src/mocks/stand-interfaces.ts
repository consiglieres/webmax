import type {IStandInterface} from "../entities/interfaces/stand.interface.ts";

// Сетевые интерфейсы стендов: ключ — poolId стенда
export const mockStandInterfaces: Record<string, IStandInterface[]> = {
    "101": [
        {
            id: "101-eth0",
            name: "eth0",
            type: "Внешний",
            address: "10.10.1.11/24"
        },
        {
            id: "101-eth1",
            name: "eth1",
            type: "Внутренний",
            address: "192.168.101.11/24"
        }
    ],
    "102": [
        {
            id: "102-eth0",
            name: "eth0",
            type: "Внешний",
            address: "10.10.2.11/24"
        },
        {
            id: "102-eth1",
            name: "eth1",
            type: "Внутренний",
            address: "192.168.102.11/24"
        }
    ],
    "103": [
        {
            id: "103-eth0",
            name: "eth0",
            type: "Внешний",
            address: "10.10.3.11/24"
        },
        {
            id: "103-eth1",
            name: "eth1",
            type: "Внутренний",
            address: "192.168.103.11/24"
        }
    ],
    "104": [
        {
            id: "104-eth0",
            name: "eth0",
            type: "Внешний",
            address: "10.10.2.12/24"
        },
        {
            id: "104-eth1",
            name: "eth1",
            type: "Внутренний",
            address: "192.168.104.11/24"
        }
    ],
    "105": [
        {
            id: "105-eth0",
            name: "eth0",
            type: "Внешний",
            address: "10.10.4.11/24"
        },
        {
            id: "105-eth1",
            name: "eth1",
            type: "Внутренний",
            address: "192.168.105.11/24"
        }
    ],
    "106": [
        {
            id: "106-eth0",
            name: "eth0",
            type: "Внешний",
            address: "10.10.1.12/24"
        },
        {
            id: "106-eth1",
            name: "eth1",
            type: "Внутренний",
            address: "192.168.106.11/24"
        }
    ],
    "107": [
        {
            id: "107-eth0",
            name: "eth0",
            type: "Внешний",
            address: "10.10.4.12/24"
        },
        {
            id: "107-eth1",
            name: "eth1",
            type: "Внутренний",
            address: "192.168.107.11/24"
        }
    ],
    "108": [
        {
            id: "108-eth0",
            name: "eth0",
            type: "Внешний",
            address: "10.10.3.12/24"
        },
        {
            id: "108-eth1",
            name: "eth1",
            type: "Внутренний",
            address: "192.168.108.11/24"
        }
    ],
    "109": [
        {
            id: "109-eth0",
            name: "eth0",
            type: "Внешний",
            address: "10.10.1.13/24"
        },
        {
            id: "109-eth1",
            name: "eth1",
            type: "Внутренний",
            address: "192.168.109.11/24"
        }
    ],
    "110": [
        {
            id: "110-eth0",
            name: "eth0",
            type: "Внешний",
            address: "10.10.1.14/24"
        },
        {
            id: "110-eth1",
            name: "eth1",
            type: "Внутренний",
            address: "192.168.110.11/24"
        }
    ],
    "111": [
        {
            id: "111-eth0",
            name: "eth0",
            type: "Внешний",
            address: "10.10.2.13/24"
        },
        {
            id: "111-eth1",
            name: "eth1",
            type: "Внутренний",
            address: "192.168.111.11/24"
        }
    ]
};
