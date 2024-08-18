import "@stdlib/deploy";
import "@stdlib/ownable";

 message AddUserMessage {
    name: String;
    address: Address;
}
message RemoveUserMessage {
    name: String;
}
message Comunicated {
    to: String;
    message: String;
}
struct User {
    name: String;
    address: Address;
    received_count: Int as uint32 = 0;
    send_count: Int as uint32 = 0;
}
struct Name {
    name: String;
}
contract DataMap with Deployable, Ownable {
    owner: Address;
    list_user: map<Int as uint256, User>;
    reversed_list: map<Address, Name>;
    count: Int as uint32;
    init(owner: Address){
        self.owner = owner;
        self.count = 0;
        self.list_user = emptyMap();
        self.reversed_list = emptyMap()
    }
    receive(msg: AddUserMessage){
        self.requireOwner();
        let hash:Int = sha256(msg.name);
        self.list_user.set(hash, User{name: msg.name, address: msg.address });
        self.reversed_list.set(msg.address, Name{name:msg.name})
    }
    receive(msg: RemoveUserMessage){
        self.requireOwner();
        let hash:Int = sha256(msg.name);
        let user:User = self.list_user.get(hash)!!;
        self.list_user.set(hash, null);
        self.reversed_list.set(user.address, null);
    }
    receive(msg: Comunicated){
        let hash: Int = sha256(msg.to);
        let user: User = self.list_user.get(hash)!!;
        send(SendParameters{
            to: user.address,
            value: 0,
            mode: SendRemainingValue,
            body: msg.message.asComment()
        });
        self.count = self.count + 1;
    }
    
    // Empty init() function is present by default in all Tact contracts
    // since v1.3.0, so the following may be omitted:
    //
    // init() {}
}
