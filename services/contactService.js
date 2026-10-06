const { pool } = require("../config/database");


// CREATE CONTACT
const createContact = async (contactData) => {

    const {
        name,
        email,
        phone,
        address,
        company
    } = contactData;

    const sql = `
        INSERT INTO contacts
        (name, email, phone, address, company)
        VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
        name,
        email,
        phone,
        address,
        company
    ];

    const [result] = await pool.execute(sql, values);

    return {
        id: result.insertId,
        name,
        email,
        phone,
        address,
        company
    };
};


// GET ALL CONTACTS
const getContacts = async ({
    search,
    sortBy,
    order,
    page,
    limit
}) => {

    let sql = `
        SELECT *
        FROM contacts
    `;

    const values = [];

    // SEARCH
    if (search) {

        sql += `
            WHERE
                name LIKE ?
                OR email LIKE ?
                OR phone LIKE ?
        `;

        const searchValue = `%${search}%`;

        values.push(
            searchValue,
            searchValue,
            searchValue
        );
    }


    // SORTING

    const allowedSortColumns = [
        "id",
        "name",
        "email",
        "phone",
        "company",
        "created_at"
    ];

    if (allowedSortColumns.includes(sortBy)) {

        const sortOrder =
            order.toUpperCase() === "DESC"
                ? "DESC"
                : "ASC";

        sql += ` ORDER BY ${sortBy} ${sortOrder}`;

    } else {

        sql += ` ORDER BY id ASC`;
    }


    // PAGINATION

    const offset = (page - 1) * limit;

    sql += `
        LIMIT ?
        OFFSET ?
    `;

    values.push(limit, offset);


    const [rows] = await pool.execute(sql, values);

    return rows;
};


// GET CONTACT BY ID
const getContactById = async (id) => {

    const sql = `
        SELECT *
        FROM contacts
        WHERE id = ?
    `;

    const [rows] = await pool.execute(sql, [id]);

    return rows[0];
};


// UPDATE CONTACT
const updateContact = async (id, contactData) => {

    const {
        name,
        email,
        phone,
        address,
        company
    } = contactData;

    const sql = `
        UPDATE contacts
        SET
            name = ?,
            email = ?,
            phone = ?,
            address = ?,
            company = ?
        WHERE id = ?
    `;

    const values = [
        name,
        email,
        phone,
        address,
        company,
        id
    ];

    const [result] = await pool.execute(sql, values);

    return result;
};


// DELETE CONTACT
const deleteContact = async (id) => {

    const sql = `
        DELETE FROM contacts
        WHERE id = ?
    `;

    const [result] = await pool.execute(sql, [id]);

    return result;
};


module.exports = {
    createContact,
    getContacts,
    getContactById,
    updateContact,
    deleteContact
};