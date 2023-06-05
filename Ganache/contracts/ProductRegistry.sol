// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

/**
 * @title ProductRegistry
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract ProductRegistry {
    struct Product {
        string name;
        string manufacturer;
        string qrCode;
        bool isAuthentic;
    }

    mapping(string => Product) private products;

    function registerProduct(string memory _name, string memory _manufacturer, string memory _qrCode) public {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_manufacturer).length > 0, "Manufacturer cannot be empty");
        require(bytes(_qrCode).length > 0, "QR code cannot be empty");

        Product memory product = Product({
            name: _name,
            manufacturer: _manufacturer,
            qrCode: _qrCode,
            isAuthentic: true
        });

        products[_qrCode] = product;
    }

    function verifyProduct(string memory _qrCode) public view returns (bool) {
        require(bytes(_qrCode).length > 0, "QR code cannot be empty");

        Product memory product = products[_qrCode];

        if (bytes(product.name).length == 0) {
            return false;
        }

        return product.isAuthentic;
    }

    function markProductAsFake(string memory _qrCode) public {
        require(bytes(_qrCode).length > 0, "QR code cannot be empty");

        Product storage product = products[_qrCode];

        if (bytes(product.name).length > 0) {
            product.isAuthentic = false;
        }
    }
}
