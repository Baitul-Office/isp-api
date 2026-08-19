const ponRepository = require("../repositories/ponRepository");


// Get all PONs
const getAll = async (page, limit, search) => {

    page = Number(page) || 1;
    limit = Number(limit) || 10;

    if (page < 1) {
        page = 1;
    }

    if (limit < 1) {
        limit = 10;
    }

    if (limit > 100) {
        limit = 100;
    }

    const result = await ponRepository.getAll({
        page,
        limit,
        search: search || ""
    });

    return {
        data: result.rows,
        pagination: {
            page,
            limit,
            total: result.total,
            totalPages: Math.ceil(result.total / limit)
        }
    };
};


// Get PON by ID
const getById = async (id) => {

    if (!id) {
        throw new Error("PON ID is required");
    }

    const pon = await ponRepository.getById(id);

    if (!pon) {
        throw new Error("PON not found");
    }

    return pon;
};


// Create PON
const create = async (data) => {

    const {
        ponno,
        poncode,
        pontype = "GPON",
        capacity = 0,
        status = 1,
        description = null,
        addedby = null
    } = data;


    if (ponno === undefined || ponno === null || ponno === "") {
        throw new Error("PON number is required");
    }

    if (!poncode || poncode.trim() === "") {
        throw new Error("PON code is required");
    }


    // Check duplicate
    const duplicate = await ponRepository.checkDuplicate(
        ponno,
        poncode
    );

    if (duplicate) {
        throw new Error(
            "PON number or PON code already exists"
        );
    }


    const insertId = await ponRepository.create({
        ponno,
        poncode: poncode.trim(),
        pontype,
        capacity,
        status,
        description,
        addedby
    });


    return await ponRepository.getById(insertId);
};


// Update PON
const update = async (id, data) => {

    if (!id) {
        throw new Error("PON ID is required");
    }


    const existing = await ponRepository.getById(id);

    if (!existing) {
        throw new Error("PON not found");
    }


    const {
        ponno,
        poncode,
        pontype = "GPON",
        capacity = 0,
        status = 1,
        description = null,
        updatedby = null
    } = data;


    if (ponno === undefined || ponno === null || ponno === "") {
        throw new Error("PON number is required");
    }

    if (!poncode || poncode.trim() === "") {
        throw new Error("PON code is required");
    }


    // Check duplicate excluding current PON
    const duplicate = await ponRepository.checkDuplicate(
        ponno,
        poncode,
        id
    );

    if (duplicate) {
        throw new Error(
            "Another PON with the same PON number or code already exists"
        );
    }


    await ponRepository.update(id, {
        ponno,
        poncode: poncode.trim(),
        pontype,
        capacity,
        status,
        description,
        updatedby
    });


    return await ponRepository.getById(id);
};


// Delete PON
const remove = async (id) => {

    if (!id) {
        throw new Error("PON ID is required");
    }


    const existing = await ponRepository.getById(id);

    if (!existing) {
        throw new Error("PON not found");
    }


    await ponRepository.remove(id);

    return true;
};


module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};