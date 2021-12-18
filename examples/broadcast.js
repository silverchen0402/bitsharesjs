import {Apis} from "bitsharesjs-ws";
import {TransactionBuilder, PrivateKey} from "../lib";
import {asset} from "../lib/serializer/src/operations";

const wifKey = "5KNP4D9K3FL1gBtRtanhfgLZTpz1wcJVsLEQXonRMeAwzMDL2se";
const pKey = PrivateKey.fromWif(wifKey);

Apis.instance("ws://localhost:30201", true).init_promise.then(
    res => {
        console.log("connected to:", res[0].network_name, "network");

        let tr = new TransactionBuilder();
        tr.add_type_operation("ticket_create", {
            fee: {
                amount: 0,
                asset_id: "1.3.0"
            },
            account: "1.2.27",
            target_type: 1,
            amount: {
                amount: 1,
                asset_id: "1.3.0"
            },
            extensions: {
            }
        });
        tr.set_required_fees().then(() => {
            tr.add_signer(pKey, pKey.toPublicKey().toPublicKeyString());
            console.log("serialized transaction:", tr.serialize().operations);
            tr
                .broadcast()
                .then(() => {
                    console.log("Broadcast success!");
                })
                .catch(err => {
                    console.error(err);
                });
        });
    }
);
