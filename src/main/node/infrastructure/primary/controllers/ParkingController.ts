import { IParkingService } from '@core/usecases/IParkingService';
import { Request, Response } from 'express';

export class ParkingController {
    private parkingService: IParkingService;

    constructor(parkingService: IParkingService) {
        this.parkingService = parkingService;
    }

    /**
     * @swagger
     * /api/v1/vehicles/register-entry:
     *   post:
     *     summary: Register a vehicle entry
     *     tags: [Parking]
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               plateNumber:
     *                 type: string
     *                 example: "ABC1234"
     *               type:
     *                 type: string
     *                 enum: [RESIDENT, NON_RESIDENT, OFFICIAL]
     *                 example: "RESIDENT"
     *     responses:
     *       201:
     *         description: Entry registered successfully
     *       400:
     *         description: Bad request, vehicle already inside
     *       500:
     *         description: Internal server error
     */
    registerEntry = async (req: Request, res: Response) => {
        try {
            const { plateNumber } = req.body;
            if (!plateNumber) {
                return res.status(400).json({ message: 'Plate number is required.' });
            }

            await this.parkingService.registerEntry(plateNumber);
            res.status(201).json({ message: 'Entry registered successfully.' });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    /**
     * @swagger
     * /api/v1/vehicles/register-exit:
     *   post:
     *     summary: Register a vehicle exit
     *     tags: [Parking]
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               plateNumber:
     *                 type: string
     *                 example: "ABC1234"
     *     responses:
     *       200:
     *         description: Exit registered successfully, and payment calculated if applicable
     *       404:
     *         description: Vehicle not found or already exited
     *       500:
     *         description: Internal server error
     */
    registerExit = async (req: Request, res: Response) => {
        try {
            const { plateNumber } = req.body;
            const result = await this.parkingService.registerExit(plateNumber);

            if (result === undefined) {
                return res.status(404).json({ message: 'Vehicle not found or already exited.' });
            }

            res.status(200).json({ message: 'Exit registered successfully.', amount: result });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    /**
     * @swagger
     * /api/v1/vehicles/add-official:
     *   post:
     *     summary: Add an official vehicle
     *     tags: [Parking]
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               plateNumber:
     *                 type: string
     *                 example: "ABC1234"
     *     responses:
     *       201:
     *         description: Official vehicle added successfully
     *       400:
     *         description: Bad request, vehicle already exists
     *       500:
     *         description: Internal server error
     */
    addOfficialVehicle = async (req: Request, res: Response) => {
        try {
            const { plateNumber } = req.body;
            if (!plateNumber) {
                return res.status(400).json({ message: 'Plate number is required.' });
            }

            await this.parkingService.addOfficialVehicle(plateNumber);
            res.status(201).json({ message: 'Official vehicle added successfully.' });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    /**
     * @swagger
     * /api/v1/vehicles/add-resident:
     *   post:
     *     summary: Add a resident vehicle
     *     tags: [Parking]
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               plateNumber:
     *                 type: string
     *                 example: "ABC1234"
     *     responses:
     *       201:
     *         description: Resident vehicle added successfully
     *       400:
     *         description: Bad request, vehicle already exists
     *       500:
     *         description: Internal server error
     */
    addResidentVehicle = async (req: Request, res: Response) => {
        try {
            const { plateNumber } = req.body;
            if (!plateNumber) {
                return res.status(400).json({ message: 'Plate number is required.' });
            }

            await this.parkingService.addResidentVehicle(plateNumber);
            res.status(201).json({ message: 'Resident vehicle added successfully.' });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };
}
