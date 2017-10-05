function range(start, stop, step) {
    if (arguments.length <= 1) {
        stop = start || 0;
        start = 0;
    }
    step = arguments[2] || 1;
    var length = Math.max (Math.ceil ((stop - start) / step) , 0);
    var idx = 0;
    var range = new Array(length);
    while (idx < length) {
        range[idx++] = start;
        start += step;
    }
    return range;
}
function len(obj) {
    if (obj instanceof Array || typeof obj === "string") return obj.length;
    else {
        var count = 0;
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) count++;
        }
        return count;
    }
}
function GameObject(){
    var self = this;

};
GameObject.prototype.draw = function(ctx, dispx, dispy){
    var self = this;
    if (self.bg_img) {
        ctx.drawImage(self.bg_img, dispx, dispy);
    }
    ctx.drawImage(self.img, dispx, dispy);
};

function MapObject(){
    var self = this;





    self.dmg_type = null;
    self.item = null;
};
MapObject.prototype = new GameObject();
MapObject.prototype.constructor = MapObject;
MapObject.prototype.leavable = function(start_x, start_y, new_x, new_y, direction){
    var self = this;
    var creature;
    "\n        in charge of determinging if a player can move\n        ";
    creature = self.game_engine.items[start_x][start_y];
    return self.game_engine.map[new_x][new_y].enterable(new_x, new_y, direction, creature);
};
MapObject.prototype.enterable = function(pos_x, pos_y, direction, creature){
    var self = this;
    return true;
};
MapObject.prototype.enter = function(pos_x, pos_y, direction, creature){
    var self = this;
    return [pos_x, pos_y];
};
MapObject.prototype.leave = function(creature){
    var self = this;
};
MapObject.prototype.slip_item = function(creature){
    var self = this;
    if (self.dmg_type != "FORCE" && self.dmg_type != "ICE" && self.dmg_type != "TELEPORT") {
        return false;
    }
    return !creature.is_safe(self.dmg_type, self.item);
};

function StaticMapObject(){
    var self = this;
};
StaticMapObject.prototype = new MapObject();
StaticMapObject.prototype.constructor = StaticMapObject;

function Tile(type_index, images, bg_img, game_engine){
    var self = this;
    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
};
Tile.prototype = new MapObject();
Tile.prototype.constructor = Tile;

function Wall(type_index, images, bg_img, game_engine){
    var self = this;

    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
};
Wall.prototype = new MapObject();
Wall.prototype.constructor = Wall;
Wall.prototype.enterable = function(pos_x, pos_y, direction, creature){
    var self = this;
    return false;
};

function Fire(type_index, images, bg_img, game_engine){
    var self = this;

    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
};
Fire.prototype = new MapObject();
Fire.prototype.constructor = Fire;
Fire.prototype.enter = function(pos_x, pos_y, direction, creature){
    var self = this;
    creature.burn(pos_x, pos_y);
    return [pos_x, pos_y];
};

function HiddenWall(type_index, images, bg_img, game_engine){
    var self = this;

    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
};
HiddenWall.prototype = new MapObject();
HiddenWall.prototype.constructor = HiddenWall;
HiddenWall.prototype.enterable = function(pos_x, pos_y, direction, creature){
    var self = this;
    return false;
};

function BlockedNorth(type_index, images, bg_img, game_engine){
    var self = this;
    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
};
BlockedNorth.prototype = new MapObject();
BlockedNorth.prototype.constructor = BlockedNorth;

function BlockedWest(type_index, images, bg_img, game_engine){
    var self = this;
    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
};
BlockedWest.prototype = new MapObject();
BlockedWest.prototype.constructor = BlockedWest;

function BlockedSouth(type_index, images, bg_img, game_engine){
    var self = this;


    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
};
BlockedSouth.prototype = new MapObject();
BlockedSouth.prototype.constructor = BlockedSouth;
BlockedSouth.prototype.enterable = function(pos_x, pos_y, direction, creature){
    var self = this;
    return direction != "N";
};
BlockedSouth.prototype.leavable = function(start_x, start_y, new_x, new_y, direction){
    var self = this;
    "\n        in charge of determinging if a player can move\n        ";
    if (direction == "S") {
        return false;
    }
    return MapObject.prototype.leavable.call(self, start_x, start_y, new_x, new_y, direction);
};

function BlockedEast(type_index, images, bg_img, game_engine){
    var self = this;
    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
};
BlockedEast.prototype = new MapObject();
BlockedEast.prototype.constructor = BlockedEast;

function CloneNorth(type_index, images, bg_img, game_engine){
    var self = this;
    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
};
CloneNorth.prototype = new MapObject();
CloneNorth.prototype.constructor = CloneNorth;

function CloneWest(type_index, images, bg_img, game_engine){
    var self = this;
    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
};
CloneWest.prototype = new MapObject();
CloneWest.prototype.constructor = CloneWest;

function CloneSouth(type_index, images, bg_img, game_engine){
    var self = this;
    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
};
CloneSouth.prototype = new MapObject();
CloneSouth.prototype.constructor = CloneSouth;

function CloneEast(type_index, images, bg_img, game_engine){
    var self = this;
    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
};
CloneEast.prototype = new MapObject();
CloneEast.prototype.constructor = CloneEast;

function Theif(type_index, images, bg_img, game_engine){
    var self = this;

    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
};
Theif.prototype = new MapObject();
Theif.prototype.constructor = Theif;
Theif.prototype.enter = function(pos_x, pos_y, direction, creature){
    var self = this;
    creature.clear_boots();
    return [pos_x, pos_y];
};

function ButtonGreen(type_index, images, bg_img, game_engine){
    var self = this;

    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
};
ButtonGreen.prototype = new MapObject();
ButtonGreen.prototype.constructor = ButtonGreen;
ButtonGreen.prototype.enter = function(pos_x, pos_y, direction, creature){
    var self = this;
    self.game_engine.switch_green_doors();
    return [pos_x, pos_y];
};

function ButtonRed(type_index, images, bg_img, game_engine){
    var self = this;



    self.bg_img = bg_img;
    self.img = images[type_index];
    self.link = null;
    self.game_engine = game_engine;
};
ButtonRed.prototype = new MapObject();
ButtonRed.prototype.constructor = ButtonRed;
ButtonRed.prototype.set_trap = function(trap_x, trap_y){
    var self = this;
    self.trap_x = trap_x;
    self.trap_y = trap_y;
};
ButtonRed.prototype.link_cloner = function(cl_x, cl_y){
    var self = this;
    self.link = [ cl_x, cl_y ];
};
ButtonRed.prototype.enter = function(pos_x, pos_y, direction, creature){
    var self = this;
    var cl_x, cl_y;
    if (self.link) {
        _$rapyd$_Unpack = self.link;
        cl_x = _$rapyd$_Unpack[0];
        cl_y = _$rapyd$_Unpack[1];
        self.game_engine.map[cl_x][cl_y].clone(cl_x, cl_y);
    }
    return [pos_x, pos_y];
};

function ButtonBrown(type_index, images, bg_img, game_engine){
    var self = this;


    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
};
ButtonBrown.prototype = new MapObject();
ButtonBrown.prototype.constructor = ButtonBrown;
ButtonBrown.prototype.set_trap = function(trap_x, trap_y){
    var self = this;
    console.log("set_button");
    self.trap_x = trap_x;
    self.trap_y = trap_y;
};
ButtonBrown.prototype.enter = function(pos_x, pos_y, direction, creature){
    var self = this;
    var trap;
    trap = self.game_engine.map[self.trap_x][self.trap_y];
    trap.open_trap();
    return [pos_x, pos_y];
};

function ButtonBlue(type_index, images, bg_img, game_engine){
    var self = this;

    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
};
ButtonBlue.prototype = new MapObject();
ButtonBlue.prototype.constructor = ButtonBlue;
ButtonBlue.prototype.enter = function(pos_x, pos_y, direction, creature){
    var self = this;
    self.game_engine.turn_tanks();
    return [pos_x, pos_y];
};

function Trap(type_index, images, bg_img, game_engine){
    var self = this;



    self.bg_img = bg_img;
    self.img = images[type_index];
    self.trapped = true;
    self.game_engine = game_engine;
};
Trap.prototype = new MapObject();
Trap.prototype.constructor = Trap;
Trap.prototype.leavable = function(start_x, start_y, new_x, new_y, direction){
    var self = this;
    "\n        in charge of determinging if a player can move\n        ";
    if (self.trapped) {
        return false;
    }
    return MapObject.prototype.leavable.call(self, start_x, start_y, new_x, new_y, direction);
};
Trap.prototype.open_trap = function(){
    var self = this;
    self.trapped = false;
};
Trap.prototype.close_trap = function(){
    var self = this;
    self.trapped = true;
};

function Gravel(type_index, images, bg_img, game_engine){
    var self = this;
    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
};
Gravel.prototype = new MapObject();
Gravel.prototype.constructor = Gravel;

function BlockedSE(type_index, images, bg_img, game_engine){
    var self = this;
    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
};
BlockedSE.prototype = new MapObject();
BlockedSE.prototype.constructor = BlockedSE;

function Cloner(type_index, images, bg_img, game_engine){
    var self = this;


    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
    self.images = images;
    self.cloned_enum = null;
};
Cloner.prototype = new MapObject();
Cloner.prototype.constructor = Cloner;
Cloner.prototype.clone = function(x, y){
    var self = this;
    if (self.game_engine.items[x][y] === null) {
        self.game_engine.items[x][y] = object_generator(self.cloned_enum, self.images, self.game_engine);
        self.game_engine.creature_links.push([ x, y ]);
        self.game_engine._set_creature_links();
    }
};
Cloner.prototype.set_cloned = function(items, cloned_enum, x, y){
    var self = this;
    "\n        Set item that should be cloned on the cloner\n        ";
    if (self.cloned_enum !== null) {
        return;
    }
    self.bg_img = self.img;
    self.img = self.images[cloned_enum];
    self.cloned_enum = cloned_enum;
    items[x][y] = null;
};

function Teleport(type_index, images, bg_img, game_engine){
    var self = this;


    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
    self.dmg_type = "TELEPORT";
};
Teleport.prototype = new MapObject();
Teleport.prototype.constructor = Teleport;
Teleport.prototype.get_slip_direction = function(direction){
    var self = this;
    return direction;
};
Teleport.prototype.enter = function(pos_x, pos_y, direction, creature){
    var self = this;
    var i, num_teleports, t_ind, t_ind, t_x, t_y, map, items, slip_ind, valid, i;
    i = 0;
    num_teleports = 4;
    t_ind = self.game_engine.get_teleport_ind(pos_x, pos_y);
    while (i < num_teleports - 1) {
        t_ind = self.game_engine.get_next_teleport_ind(t_ind);
        _$rapyd$_Unpack = self.game_engine.get_teleport_pos(t_ind);
        t_x = _$rapyd$_Unpack[0];
        t_y = _$rapyd$_Unpack[1];
        map = self.game_engine.map;
        items = self.game_engine.items;
        slip_ind = null;
        valid = creature.valid_move(t_x, t_y, direction, slip_ind, test = true)[0];
        if (valid) {
            return [t_x, t_y];
        }
        i += 1;
    }
    console.log("Not Implemented " + a);
    return [pos_x, pos_y];
};

function SlidingFloor(){
    var self = this;
};
SlidingFloor.prototype = new MapObject();
SlidingFloor.prototype.constructor = SlidingFloor;

function ForceFloor(){
    var self = this;
    self.dmg_type = "FORCE";
    self.item = "INV_SUCTIONBOOTS";
};
ForceFloor.prototype = new SlidingFloor();
ForceFloor.prototype.constructor = ForceFloor;

function ForceAll(type_index, images, bg_img, game_engine){
    var self = this;
    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
};
ForceAll.prototype = new ForceFloor();
ForceAll.prototype.constructor = ForceAll;

function ForceNorth(type_index, images, bg_img, game_engine){
    var self = this;

    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
};
ForceNorth.prototype = new ForceFloor();
ForceNorth.prototype.constructor = ForceNorth;
ForceNorth.prototype.get_slip_direction = function(direction){
    var self = this;
    return "N";
};

function ForceEast(type_index, images, bg_img, game_engine){
    var self = this;

    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
};
ForceEast.prototype = new ForceFloor();
ForceEast.prototype.constructor = ForceEast;
ForceEast.prototype.get_slip_direction = function(direction){
    var self = this;
    return "E";
};

function ForstWest(type_index, images, bg_img, game_engine){
    var self = this;

    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
};
ForstWest.prototype = new ForceFloor();
ForstWest.prototype.constructor = ForstWest;
ForstWest.prototype.get_slip_direction = function(direction){
    var self = this;
    return "W";
};

function ForceSouth(type_index, images, bg_img, game_engine){
    var self = this;

    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
};
ForceSouth.prototype = new ForceFloor();
ForceSouth.prototype.constructor = ForceSouth;
ForceSouth.prototype.get_slip_direction = function(direction){
    var self = this;
    return "S";
};

function IceFloor(){
    var self = this;
    self.dmg_type = "ICE";
    self.item = "INV_SKATES";
};
IceFloor.prototype = new SlidingFloor();
IceFloor.prototype.constructor = IceFloor;

function Ice(type_index, images, bg_img, game_engine){
    var self = this;

    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
};
Ice.prototype = new IceFloor();
Ice.prototype.constructor = Ice;
Ice.prototype.get_slip_direction = function(direction){
    var self = this;
    return direction;
};

function IceSE(type_index, images, bg_img, game_engine){
    var self = this;


    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
};
IceSE.prototype = new IceFloor();
IceSE.prototype.constructor = IceSE;
IceSE.prototype.enterable = function(pos_x, pos_y, direction, creature){
    var self = this;
    if (direction == "S" || direction == "E") {
        return false;
    } else {
        return true;
    }
};
IceSE.prototype.get_slip_direction = function(direction){
    var self = this;
    if (direction == "W") {
        return "S";
    } else if (direction == "N") {
        return "E";
    }
    return direction;
};

function IceSW(type_index, images, bg_img, game_engine){
    var self = this;


    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
};
IceSW.prototype = new IceFloor();
IceSW.prototype.constructor = IceSW;
IceSW.prototype.enterable = function(pos_x, pos_y, direction, creature){
    var self = this;
    if (direction == "S" || direction == "W") {
        return false;
    } else {
        return true;
    }
};
IceSW.prototype.get_slip_direction = function(direction){
    var self = this;
    if (direction == "E") {
        return "S";
    } else if (direction == "N") {
        return "W";
    }
    return direction;
};

function IceNW(type_index, images, bg_img, game_engine){
    var self = this;


    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
};
IceNW.prototype = new IceFloor();
IceNW.prototype.constructor = IceNW;
IceNW.prototype.enterable = function(pos_x, pos_y, direction, creature){
    var self = this;
    if (direction == "N" || direction == "W") {
        return false;
    } else {
        return true;
    }
};
IceNW.prototype.get_slip_direction = function(direction){
    var self = this;
    if (direction == "E") {
        return "N";
    } else if (direction == "S") {
        return "W";
    }
    return direction;
};

function IceNE(type_index, images, bg_img, game_engine){
    var self = this;


    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
};
IceNE.prototype = new IceFloor();
IceNE.prototype.constructor = IceNE;
IceNE.prototype.enterable = function(pos_x, pos_y, direction, creature){
    var self = this;
    if (direction == "N" || direction == "E") {
        return false;
    } else {
        return true;
    }
};
IceNE.prototype.get_slip_direction = function(direction){
    var self = this;
    if (direction == "W") {
        return "N";
    } else if (direction == "S") {
        return "E";
    }
    return direction;
};

function Hint(type_index, images, bg_img, game_engine){
    var self = this;


    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
};
Hint.prototype = new MapObject();
Hint.prototype.constructor = Hint;
Hint.prototype.enter = function(pos_x, pos_y, direction, creature){
    var self = this;
    if (creature instanceof Player) {
        self.game_engine.set_msg(self.game_engine.hint);
    }
    return [pos_x, pos_y];
};
Hint.prototype.leave = function(creature){
    var self = this;
    self.game_engine.set_msg("");
};

function Exit(type_index, images, bg_img, game_engine){
    var self = this;

    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
};
Exit.prototype = new MapObject();
Exit.prototype.constructor = Exit;
Exit.prototype.enter = function(pos_x, pos_y, direction, creature){
    var self = this;
    self.game_engine.game_state = FINISHED;
    return [pos_x, pos_y];
};

function DynamicMapObject(){
    var self = this;
};
DynamicMapObject.prototype = new MapObject();
DynamicMapObject.prototype.constructor = DynamicMapObject;

function Consumeable() {

    MapObject.prototype.constructor.apply(this, arguments);
}
Consumeable.prototype = new MapObject();
Consumeable.prototype.constructor = Consumeable;
Consumeable.prototype.enter = function(pos_x, pos_y, direction, creature){
    var self = this;
    var new_obj;
    new_obj = object_generator(0, self.game_engine.images, self.game_engine);
    self.game_engine.map[pos_x][pos_y] = new_obj;
    creature.add_inventory(self.item_name, self);
    return [pos_x, pos_y];
};

function Chip(type_index, images, bg_img, game_engine){
    var self = this;

    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
    self.item_name = "CHIP";
};
Chip.prototype = new Consumeable();
Chip.prototype.constructor = Chip;
Chip.prototype.enter = function(pos_x, pos_y, direction, creature){
    var self = this;
    self.game_engine.get_chip();
    return Consumeable.prototype.enter.call(self, pos_x, pos_y, direction, creature);
};

function Key(){
    var self = this;
};
Key.prototype = new Consumeable();
Key.prototype.constructor = Key;

function KeyBlue(type_index, images, bg_img, game_engine){
    var self = this;
    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
    self.item_name = "KEY_BLUE";
    self.div_name = "blue";
};
KeyBlue.prototype = new Key();
KeyBlue.prototype.constructor = KeyBlue;

function KeyRed(type_index, images, bg_img, game_engine){
    var self = this;
    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
    self.item_name = "KEY_RED";
    self.div_name = "red";
};
KeyRed.prototype = new Key();
KeyRed.prototype.constructor = KeyRed;

function KeyGreen(type_index, images, bg_img, game_engine){
    var self = this;
    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
    self.item_name = "KEY_GREEN";
    self.div_name = "green";
};
KeyGreen.prototype = new Key();
KeyGreen.prototype.constructor = KeyGreen;

function KeyYellow(type_index, images, bg_img, game_engine){
    var self = this;
    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
    self.item_name = "KEY_YELLOW";
    self.div_name = "yellow";
};
KeyYellow.prototype = new Key();
KeyYellow.prototype.constructor = KeyYellow;

function Flippers(type_index, images, bg_img, game_engine){
    var self = this;
    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
    self.item_name = "INV_FLIPPERS";
};
Flippers.prototype = new Consumeable();
Flippers.prototype.constructor = Flippers;

function FireBoots(type_index, images, bg_img, game_engine){
    var self = this;
    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
    self.item_name = "INV_FIREBOOTS";
};
FireBoots.prototype = new Consumeable();
FireBoots.prototype.constructor = FireBoots;

function Skates(type_index, images, bg_img, game_engine){
    var self = this;
    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
    self.item_name = "INV_SKATES";
};
Skates.prototype = new Consumeable();
Skates.prototype.constructor = Skates;

function SuctionBoots(type_index, images, bg_img, game_engine){
    var self = this;
    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
    self.item_name = "INV_SUCTIONBOOTS";
};
SuctionBoots.prototype = new Consumeable();
SuctionBoots.prototype.constructor = SuctionBoots;

function Door(){
    var self = this;


};
Door.prototype = new MapObject();
Door.prototype.constructor = Door;
Door.prototype.enterable = function(pos_x, pos_y, direction, creature){
    var self = this;
    return creature.check_inventory(self.key, self.count);
};
Door.prototype.enter = function(pos_x, pos_y, direction, creature){
    var self = this;
    var new_obj;
    if (self.use_item) {
        creature.use_item(self.key);
    }
    new_obj = object_generator(0, self.game_engine.images, self.game_engine);
    self.game_engine.map[pos_x][pos_y] = new_obj;
    return [pos_x, pos_y];
};

function DoorBlue(type_index, images, bg_img, game_engine){
    var self = this;
    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
    self.key = "KEY_BLUE";
    self.use_item = true;
    self.count = 1;
};
DoorBlue.prototype = new Door();
DoorBlue.prototype.constructor = DoorBlue;

function DoorRed(type_index, images, bg_img, game_engine){
    var self = this;
    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
    self.key = "KEY_RED";
    self.use_item = true;
    self.count = 1;
};
DoorRed.prototype = new Door();
DoorRed.prototype.constructor = DoorRed;

function DoorGreen(type_index, images, bg_img, game_engine){
    var self = this;
    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
    self.key = "KEY_GREEN";
    self.use_item = false;
    self.count = 1;
};
DoorGreen.prototype = new Door();
DoorGreen.prototype.constructor = DoorGreen;

function DoorYellow(type_index, images, bg_img, game_engine){
    var self = this;
    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
    self.key = "KEY_YELLOW";
    self.use_item = true;
    self.count = 1;
};
DoorYellow.prototype = new Door();
DoorYellow.prototype.constructor = DoorYellow;

function ClerableMap(){
    var self = this;

};
ClerableMap.prototype = new MapObject();
ClerableMap.prototype.constructor = ClerableMap;
ClerableMap.prototype.enter = function(pos_x, pos_y, direction, creature){
    var self = this;
    var new_obj;
    new_obj = object_generator(0, self.game_engine.images, self.game_engine);
    self.game_engine.map[pos_x][pos_y] = new_obj;
    return [pos_x, pos_y];
};

function Socket(type_index, images, bg_img, game_engine){
    var self = this;

    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
};
Socket.prototype = new ClerableMap();
Socket.prototype.constructor = Socket;
Socket.prototype.enterable = function(pos_x, pos_y, direction, creature){
    var self = this;
    if (self.game_engine.have_all_chips()) {
        return true;
    } else {
        return false;
    }
};

function Dirt(type_index, images, bg_img, game_engine){
    var self = this;
    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
};
Dirt.prototype = new ClerableMap();
Dirt.prototype.constructor = Dirt;

function BlueNone(type_index, images, bg_img, game_engine){
    var self = this;
    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
};
BlueNone.prototype = new ClerableMap();
BlueNone.prototype.constructor = BlueNone;

function Water(type_index, images, bg_img, game_engine){
    var self = this;

    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
};
Water.prototype = new MapObject();
Water.prototype.constructor = Water;
Water.prototype.enter = function(pos_x, pos_y, direction, creature){
    var self = this;
    creature.drown(pos_x, pos_y);
    return [pos_x, pos_y];
};

function BecomeWall(){
    var self = this;

};
BecomeWall.prototype = new MapObject();
BecomeWall.prototype.constructor = BecomeWall;
BecomeWall.prototype.enterable = function(pos_x, pos_y, direction, creature){
    var self = this;
    var new_obj;
    if (creature.can_push_on_walls) {
        new_obj = object_generator(1, self.game_engine.images, self.game_engine);
        self.game_engine.map[pos_x][pos_y] = new_obj;
    }
    return false;
};

function BlueWall(type_index, images, bg_img, game_engine){
    var self = this;
    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
};
BlueWall.prototype = new BecomeWall();
BlueWall.prototype.constructor = BlueWall;

function SemiHiddenWall(type_index, images, bg_img, game_engine){
    var self = this;
    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
};
SemiHiddenWall.prototype = new BecomeWall();
SemiHiddenWall.prototype.constructor = SemiHiddenWall;

function PassWall(type_index, images, bg_img, game_engine){
    var self = this;


    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
};
PassWall.prototype = new MapObject();
PassWall.prototype.constructor = PassWall;
PassWall.prototype.enter = function(pos_x, pos_y, direction, creature){
    var self = this;
    var new_obj;
    new_obj = object_generator(1, self.game_engine.images, self.game_engine);
    self.game_engine.map[pos_x][pos_y] = new_obj;
    return [pos_x, pos_y];
};
PassWall.prototype.enterable = function(pos_x, pos_y, direction, creature){
    var self = this;
    return true;
};

function Bomb(type_index, images, bg_img, game_engine){
    var self = this;

    self.bg_img = bg_img;
    self.img = images[type_index];
    self.game_engine = game_engine;
};
Bomb.prototype = new ClerableMap();
Bomb.prototype.constructor = Bomb;
Bomb.prototype.enter = function(pos_x, pos_y, direction, creature){
    var self = this;
    ClerableMap.prototype.enter.call(self, pos_x, pos_y, direction, creature);
    self.game_engine.items[pos_x][pos_y] = null;
    creature.kill("exploded", pos_x, pos_y);
    return [pos_x, pos_y];
};

function SwitchedWall(type_index, images, bg_img, game_engine){
    var self = this;



    self.bg_img = bg_img;
    self.game_engine = game_engine;
    self.closed = type_index == 37;
    self.closed_img = images[37];
    self.open_img = images[38];
    self.set_image();
};
SwitchedWall.prototype = new MapObject();
SwitchedWall.prototype.constructor = SwitchedWall;
SwitchedWall.prototype.set_image = function(){
    var self = this;
    if (self.closed) {
        self.img = self.closed_img;
    } else {
        self.img = self.open_img;
    }
};
SwitchedWall.prototype.flip_wall = function(){
    var self = this;
    self.closed = !self.closed;
    self.set_image();
};
SwitchedWall.prototype.enterable = function(pos_x, pos_y, direction, creature){
    var self = this;
    return !self.closed;
};



function PlayerKilled(msg){
    var self = this;
    self.msg = msg;
};

function MonsterKilled(msg){
    var self = this;
    self.msg = msg;
};

DIRDXY = {
    "N": [ 0, -1 ],
    "S": [ 0, 1 ],
    "E": [ 1, 0 ],
    "W": [ -1, 0 ]
};

TURN_DICT = {
    "N": {
        "L": "W",
        "R": "E",
        "F": "N",
        "B": "S"
    },
    "S": {
        "L": "E",
        "R": "W",
        "F": "S",
        "B": "N"
    },
    "W": {
        "L": "S",
        "R": "N",
        "F": "W",
        "B": "E"
    },
    "E": {
        "L": "N",
        "R": "S",
        "F": "E",
        "B": "W"
    }
};

function Item(){
    var self = this;

















    self.avoid_list = [];
    self.unenterable = [];
    self.push_list = [];
    self.items = {};
    self.immunities = [];
    self.can_push_on_walls = false;
    self.is_slipping = false;
};
Item.prototype = new GameObject();
Item.prototype.constructor = Item;
Item.prototype.check_map_bound = function(new_x, new_y){
    var self = this;
    if (new_x > LEVELSIZE - 1) {
        return false;
    } else if (new_x < 0) {
        return false;
    }
    if (new_y > LEVELSIZE - 1) {
        return false;
    } else if (new_y < 0) {
        return false;
    }
    return true;
};
Item.prototype.set_item_pos = function(items, old_x, old_y, new_x, new_y){
    var self = this;
    items[new_x][new_y] = items[old_x][old_y];
    items[old_x][old_y] = null;
};
Item.prototype.valid_move = function(start_x, start_y, direction, slip_ind, test){
    var self = this;
    if (typeof test === "undefined") test = false;
    var dx, dy, new_x, new_y, valid_move, map, curr_floor, valid_move, dest_floor, unenterabe_class, items, neighbors_ok, new_floor, dest_x, dest_y, is_slippery, s_direction;
    "\n        Move an item from start_x, start_y by dx, dy.\n        Note that it does not update the sliplist.  Note that monsters cannot\n        move themselves when on the sliplist.\n        ";
    _$rapyd$_Unpack = DIRDXY[direction];
    dx = _$rapyd$_Unpack[0];
    dy = _$rapyd$_Unpack[1];
    new_x = start_x + dx;
    new_y = start_y + dy;
    valid_move = self.check_map_bound(new_x, new_y);
    if (!valid_move) {
        return [false, start_x, start_y];
    }
    map = self.game_engine.map;
    curr_floor = map[start_x][start_y];
    valid_move = curr_floor.leavable(start_x, start_y, new_x, new_y, direction);
    if (!valid_move) {
        return [false, start_x, start_y];
    }
    dest_floor = map[new_x][new_y];
    var _$rapyd$_Iter0 = self.unenterable;
    for (var _$rapyd$_Index0 = 0; _$rapyd$_Index0 < _$rapyd$_Iter0.length; _$rapyd$_Index0++) {
        unenterabe_class = _$rapyd$_Iter0[_$rapyd$_Index0];
        if (dest_floor instanceof unenterabe_class) {
            return [false, start_x, start_y];
        }
    }
    items = self.game_engine.items;
    neighbors_ok = self.move_neighbors(new_x, new_y, direction, map, items, test = test);
    if (neighbors_ok) {
        if (test) {
            return [true, new_x, new_y];
        }
        self.step_on_item(items[new_x][new_y], new_x, new_y);
        new_floor = map[new_x][new_y];
        self.set_item_pos(items, start_x, start_y, new_x, new_y);
        if (self.creature_link !== null) {
            self.game_engine.creature_links[self.creature_link] = [new_x, new_y];
        }
        map[start_x][start_y].leave(self);
        _$rapyd$_Unpack = map[new_x][new_y].enter(new_x, new_y, direction, self);
        dest_x = _$rapyd$_Unpack[0];
        dest_y = _$rapyd$_Unpack[1];
        is_slippery = new_floor.slip_item(self);
        if (is_slippery) {
            s_direction = new_floor.get_slip_direction(direction);
            if (slip_ind == null) {
                self.add_to_sliplist(slip_ind, dest_x, dest_y, s_direction);
            } else {
                self.update_sliplist(slip_ind, dest_x, dest_y, s_direction);
            }
        } else if (slip_ind != null) {
            self.remove_from_sliplist(slip_ind);
        }
        if (dest_x != new_x || dest_y != new_y) {
            self.set_item_pos(items, new_x, new_y, dest_x, dest_y);
        }
        return [true, dest_x, dest_y];
    } else {
        return [false, start_x, start_y];
    }
};
Item.prototype.move_neighbors = function(new_x, new_y, direction, map, items, test){
    var self = this;
    if (typeof test === "undefined") test = false;
    var dest_item, interactive, interactive, untouchable_class, slip_ind, pushable, pushable, merge_class, valid_move;
    if (!items[new_x][new_y]) {
        return true;
    }
    dest_item = items[new_x][new_y];
    interactive = true;
    var _$rapyd$_Iter1 = self.avoid_list;
    for (var _$rapyd$_Index1 = 0; _$rapyd$_Index1 < _$rapyd$_Iter1.length; _$rapyd$_Index1++) {
        untouchable_class = _$rapyd$_Iter1[_$rapyd$_Index1];
        if (dest_item instanceof untouchable_class) {
            interactive = false;
            break;
        }
    }
    if (!interactive) {
        return false;
    }
    slip_ind = null;
    pushable = false;
    var _$rapyd$_Iter2 = self.push_list;
    for (var _$rapyd$_Index2 = 0; _$rapyd$_Index2 < _$rapyd$_Iter2.length; _$rapyd$_Index2++) {
        merge_class = _$rapyd$_Iter2[_$rapyd$_Index2];
        if (dest_item instanceof merge_class) {
            pushable = true;
            break;
        }
    }
    if (pushable) {
        valid_move = dest_item.valid_move(new_x, new_y, direction, slip_ind, test = test)[0];
        return valid_move;
    }
    return true;
};
Item.prototype.step_on_item = function(target_item, t_x, t_y){
    var self = this;
    return null;
};
Item.prototype.add_inventory = function(item_name, item){
    var self = this;
    console.log("Not Implemented");
    return;
};
Item.prototype.check_inventory = function(item_name, count){
    var self = this;
    console.log("Not Implemented");
    return false;
};
Item.prototype.use_item = function(item_name){
    var self = this;
    console.log("Not Implemented");
    return;
};
Item.prototype.clear_boots = function(){
    var self = this;
};
Item.prototype.is_safe = function(item){
    var type = this;
    console.log("Not Implemented");
    return false;
};
Item.prototype.burn = function(pos_x, pos_y){
    var self = this;
    console.log("Not Implemented");
    return;
};
Item.prototype.set_new_direction = function(direction){
    var self = this;
    return;
};
Item.prototype.drown = function(pos_x, pos_y){
    var self = this;
    console.log("Not Implemented");
    return;
};
Item.prototype.is_safe = function(dmg_type, item){
    var self = this;
    if (self.immunities.indexOf(dmg_type) >= 0) {
        return true;
    } else if (self.check_inventory(item, 1)) {
        return true;
    } else {
        return false;
    }
};
Item.prototype.update_sliplist = function(index, pos_x, pos_y, direction){
    var self = this;
    self.is_slipping = true;
    self.game_engine.slip_list[index] = [pos_x, pos_y, direction];
};
Item.prototype.add_to_sliplist = function(index, pos_x, pos_y, direction){
    var self = this;
    "\n        if index is None, \n        ";
    self.is_slipping = true;
    self.game_engine.slip_list.push([pos_x, pos_y, direction]);
};
Item.prototype.remove_from_sliplist = function(index){
    var self = this;
    self.game_engine.slip_list.splice(index, 1);
    self.is_slipping = false;
};
Item.prototype.kill = function(msg, pos_x, pos_y){
    var self = this;
    return;
};

function Block(type_index, images, bg_img, game_engine){
    var self = this;



    self.bg_img = bg_img;
    self.img = images[type_index];
    self.is_slipping = false;
    self.avoid_list = [ Block ];
    self.game_engine = game_engine;
};
Block.prototype = new Item();
Block.prototype.constructor = Block;
Block.prototype.step_on_item = function(target_item, t_x, t_y){
    var self = this;
    if (target_item instanceof Player) {
        throw new PlayerKilled("block crushed player");
    }
    if (target_item instanceof Monster) {
        self.game_engine.kill_monster(t_x, t_y);
    }
    return null;
};
Block.prototype.burn = function(pos_x, pos_y){
    var self = this;
    return;
};
Block.prototype.drown = function(pos_x, pos_y){
    var self = this;
    self.game_engine.map[pos_x][pos_y] = object_generator(11, self.game_engine.images, self.game_engine);
    self.game_engine.items[pos_x][pos_y] = null;
};

function Creature(){
    var self = this;





};
Creature.prototype = new Item();
Creature.prototype.constructor = Creature;
Creature.prototype.add_inventory = function(item_name, item){
    var self = this;
    var item_count;
    item_count = self.items[item_name];
    if (typeof item_count === "undefined") {
        self.items[item_name] = 0;
    }
    self.items[item_name] += 1;
};
Creature.prototype.check_inventory = function(item_name, count){
    var self = this;
    var item_count, has_items, has_items;
    item_count = self.items[item_name];
    has_items = false;
    if (typeof item_count !== "undefined" && self.items[item_name] >= count) {
        has_items = true;
    }
    return has_items;
};
Creature.prototype.use_item = function(item_name){
    var self = this;
    self.items[item_name] -= 1;
};
Creature.prototype.burn = function(pos_x, pos_y){
    var self = this;
    if (!self.is_safe("FIRE", "INV_FIREBOOTS")) {
        self.game_engine.items[pos_x][pos_y] = null;
    }
};
Creature.prototype.drown = function(pos_x, pos_y){
    var self = this;
    if (!self.is_safe("WATER", "INV_FLIPPERS")) {
        self.game_engine.items[pos_x][pos_y] = null;
        throw new MonsterKilled("drowned");
    }
};

function Player(type_index, images, bg_img, game_engine){
    var self = this;











    self.bg_img = bg_img;
    self.img = images[type_index];
    self.push_list = [ Block ];
    self.avoid_list = [];
    self.can_push_on_walls = true;
    self.items = {};
    self.is_slipping = false;
    self.game_engine = game_engine;
};
Player.prototype = new Creature();
Player.prototype.constructor = Player;
Player.prototype.set_item_pos = function(items, old_x, old_y, new_x, new_y){
    var self = this;
    items[new_x][new_y] = items[old_x][old_y];
    items[old_x][old_y] = null;
    self.game_engine.x = new_x;
    self.game_engine.y = new_y;
};
Player.prototype.valid_move = function(start_x, start_y, direction, slip_ind, test){
    var self = this;
    if (typeof test === "undefined") test = false;
    if (slip_ind == null && self.is_slipping) {
        slip_ind = 0;
    }
    return Item.prototype.valid_move.call(self, start_x, start_y, direction, slip_ind, test = test);
};
Player.prototype.set_inventory_icon = function(item_name, item){
    var self = this;
    var key_name, key_div, key_name, key_div;
    "\n        Only set the item if the item_count is non-zero\n        ";
    if (item && self.items[item_name] > 0) {
        key_name = item_name.toLowerCase();
        key_div = document.getElementById(key_name);
        key_div.style.backgroundImage = "url(" + item.img.src + ")";
    } else if (self.items[item_name] == 0) {
        key_name = item_name.toLowerCase();
        key_div = document.getElementById(key_name);
        key_div.style.backgroundImage = "";
    }
};
Player.prototype.add_inventory = function(item_name, item){
    var self = this;
    Creature.prototype.add_inventory.call(self, item_name, item);
    if (item_name.slice(0, 4) == "KEY_" || item_name.slice(0, 4) == "INV_") {
        self.set_inventory_icon(item_name, item);
    }
};
Player.prototype.clear_boots = function(){
    var self = this;
    var item;
    "\n        Just clear all boots\n        ";
    var _$rapyd$_Iter3 = [ "INV_FIREBOOTS", "INV_FLIPPERS", "INV_SKATES", "INV_SUCTIONBOOTS" ];
    for (var _$rapyd$_Index3 = 0; _$rapyd$_Index3 < _$rapyd$_Iter3.length; _$rapyd$_Index3++) {
        item = _$rapyd$_Iter3[_$rapyd$_Index3];
        self.items[item] = 0;
        self.set_inventory_icon(item, null);
    }
};
Player.prototype.use_item = function(item_name){
    var self = this;
    Creature.prototype.use_item.call(self, item_name);
    if (item_name.slice(0, 4) == "KEY_" || item_name.slice(0, 4) == "INV_") {
        self.set_inventory_icon(item_name, null);
    }
};
Player.prototype.burn = function(pos_x, pos_y){
    var self = this;
    if (!self.is_safe("FIRE", "INV_FIREBOOTS")) {
        throw new PlayerKilled("Burned");
    }
};
Player.prototype.drown = function(pos_x, pos_y){
    var self = this;
    if (!self.is_safe("WATER", "INV_FLIPPERS")) {
        throw new PlayerKilled("Drowned");
    }
};
Player.prototype.step_on_item = function(target_item, t_x, t_y){
    var self = this;
    if (target_item instanceof Monster) {
        throw new PlayerKilled("player stepped on monster");
    }
    return null;
};
Player.prototype.add_to_sliplist = function(index, pos_x, pos_y, direction){
    var self = this;
    "\n        if index is None, add to the list\n        ";
    self.is_slipping = true;
    self.game_engine.slip_list.unshift([pos_x, pos_y, direction]);
};
Player.prototype.kill = function(msg, pos_x, pos_y){
    var self = this;
    throw new PlayerKilled(msg);
};

function Monster(){
    var self = this;




    self.collision_list = [ Creature ];
    self.unenterable = [ Dirt, Gravel, Fire, Chip, PassWall ];
    self.avoid_list = [ Block ];
};
Monster.prototype = new Creature();
Monster.prototype.constructor = Monster;
Monster.prototype.valid_move = function(start_x, start_y, direction, slip_ind, test){
    var self = this;
    if (typeof test === "undefined") test = false;
    var valid_move, new_x, new_y;
    _$rapyd$_Unpack = Item.prototype.valid_move.call(self, start_x, start_y, direction, slip_ind, test = test);
    valid_move = _$rapyd$_Unpack[0];
    new_x = _$rapyd$_Unpack[1];
    new_y = _$rapyd$_Unpack[2];
    if (valid_move) {
        self.game_engine.creature_links[self.creature_link] = [new_x, new_y];
    }
    return [valid_move, new_x, new_y];
};
Monster.prototype.move = function(start_x, start_y){
    var self = this;
    var turn_dict_current, abs_turn_direction, is_valid, new_x, new_y, turn_direction;
    if (self.is_slipping) {
        return [start_x, start_y];
    }
    turn_dict_current = TURN_DICT[self.direction];
    var _$rapyd$_Iter4 = self.turn_priority;
    for (var _$rapyd$_Index4 = 0; _$rapyd$_Index4 < _$rapyd$_Iter4.length; _$rapyd$_Index4++) {
        turn_direction = _$rapyd$_Iter4[_$rapyd$_Index4];
        abs_turn_direction = turn_dict_current[turn_direction];
        _$rapyd$_Unpack = self.valid_move(start_x, start_y, abs_turn_direction, null);
        is_valid = _$rapyd$_Unpack[0];
        new_x = _$rapyd$_Unpack[1];
        new_y = _$rapyd$_Unpack[2];
        if (is_valid) {
            self.set_new_direction(abs_turn_direction);
            return [new_x, new_y];
        }
    }
    return [start_x, start_y];
};
Monster.prototype.kill = function(msg, pos_x, pos_y){
    var self = this;
    throw new MonsterKilled(msg);
};
Monster.prototype.step_on_item = function(target_item, t_x, t_y){
    var self = this;
    if (target_item instanceof Player) {
        throw new PlayerKilled("Monster killed player");
    }
    return null;
};

function Bug(type_index, images, bg_img, game_engine){
    var self = this;

    var direction, direction, key;
    self.bg_img = bg_img;
    self.avoid_list = [ Block, Bug ];
    self.game_engine = game_engine;
    self.direction_map = {
        "N": 64,
        "W": 65,
        "S": 66,
        "E": 67
    };
    self.image_set = images;
    direction = null;
    var _$rapyd$_Iter5 = Object.keys(self.direction_map);
    for (var _$rapyd$_Index5 = 0; _$rapyd$_Index5 < _$rapyd$_Iter5.length; _$rapyd$_Index5++) {
        key = _$rapyd$_Iter5[_$rapyd$_Index5];
        if (self.direction_map[key] == type_index) {
            direction = key;
            break;
        }
    }
    self.set_new_direction(direction);
    self.turn_priority = [ "L", "F", "R", "B" ];
};
Bug.prototype = new Monster();
Bug.prototype.constructor = Bug;
Bug.prototype.set_new_direction = function(direction){
    var self = this;
    var type_index;
    type_index = self.direction_map[direction];
    self.direction = direction;
    self.img = self.image_set[type_index];
};

function FireBug(type_index, images, bg_img, game_engine){
    var self = this;

    var direction, direction, key;
    self.immunities = [ "FIRE" ];
    self.bg_img = bg_img;
    self.game_engine = game_engine;
    self.avoid_list = [ Block, FireBug ];
    self.unenterable = [ Dirt, Gravel, Chip ];
    self.direction_map = {
        "N": 68,
        "W": 69,
        "S": 70,
        "E": 71
    };
    self.image_set = images;
    direction = null;
    var _$rapyd$_Iter6 = Object.keys(self.direction_map);
    for (var _$rapyd$_Index6 = 0; _$rapyd$_Index6 < _$rapyd$_Iter6.length; _$rapyd$_Index6++) {
        key = _$rapyd$_Iter6[_$rapyd$_Index6];
        if (self.direction_map[key] == type_index) {
            direction = key;
            break;
        }
    }
    self.set_new_direction(direction);
    self.turn_priority = [ "F", "L", "R", "B" ];
};
FireBug.prototype = new Monster();
FireBug.prototype.constructor = FireBug;
FireBug.prototype.set_new_direction = function(direction){
    var self = this;
    var type_index;
    type_index = self.direction_map[direction];
    self.direction = direction;
    self.img = self.image_set[type_index];
};

function PinkBall(type_index, images, bg_img, game_engine){
    var self = this;

    var direction, direction, key;
    self.bg_img = bg_img;
    self.game_engine = game_engine;
    self.avoid_list = [ Block, PinkBall ];
    self.direction_map = {
        "N": 72,
        "W": 73,
        "S": 74,
        "E": 75
    };
    self.image_set = images;
    direction = null;
    var _$rapyd$_Iter7 = Object.keys(self.direction_map);
    for (var _$rapyd$_Index7 = 0; _$rapyd$_Index7 < _$rapyd$_Iter7.length; _$rapyd$_Index7++) {
        key = _$rapyd$_Iter7[_$rapyd$_Index7];
        if (self.direction_map[key] == type_index) {
            direction = key;
            break;
        }
    }
    self.set_new_direction(direction);
    self.turn_priority = [ "F", "B" ];
};
PinkBall.prototype = new Monster();
PinkBall.prototype.constructor = PinkBall;
PinkBall.prototype.set_new_direction = function(direction){
    var self = this;
    var type_index;
    type_index = self.direction_map[direction];
    self.direction = direction;
    self.img = self.image_set[type_index];
};

function Tank(type_index, images, bg_img, game_engine){
    var self = this;



    var direction, direction, key;
    self.bg_img = bg_img;
    self.game_engine = game_engine;
    self.avoid_list = [ Block, Tank ];
    self.direction_map = {
        "N": 76,
        "W": 77,
        "S": 78,
        "E": 79
    };
    self.image_set = images;
    self.state = 0;
    direction = null;
    var _$rapyd$_Iter8 = Object.keys(self.direction_map);
    for (var _$rapyd$_Index8 = 0; _$rapyd$_Index8 < _$rapyd$_Iter8.length; _$rapyd$_Index8++) {
        key = _$rapyd$_Iter8[_$rapyd$_Index8];
        if (self.direction_map[key] == type_index) {
            direction = key;
            break;
        }
    }
    self.set_new_direction(direction);
    self.fin_direction = direction;
    self.clicked = true;
};
Tank.prototype = new Monster();
Tank.prototype.constructor = Tank;
Tank.prototype.set_new_direction = function(direction){
    var self = this;
    var type_index;
    type_index = self.direction_map[direction];
    self.direction = direction;
    self.img = self.image_set[type_index];
};
Tank.prototype.trigger = function(){
    var self = this;
    var new_direction, fin_direction;
    new_direction = TURN_DICT[self.direction]["L"];
    fin_direction = TURN_DICT[new_direction]["L"];
    self.set_new_direction(new_direction);
    self.fin_direction = fin_direction;
    self.clicked = true;
};
Tank.prototype.move = function(start_x, start_y){
    var self = this;
    var is_valid, new_x, new_y;
    if (!self.clicked) {
        return [start_x, start_y];
    }
    if (self.new_direction != self.fin_direction) {
        self.set_new_direction(self.fin_direction);
    }
    self.clicked = false;
    _$rapyd$_Unpack = self.valid_move(start_x, start_y, self.fin_direction, null);
    is_valid = _$rapyd$_Unpack[0];
    new_x = _$rapyd$_Unpack[1];
    new_y = _$rapyd$_Unpack[2];
    if (is_valid) {
        self.clicked = true;
    }
    return [new_x, new_y];
};

function Ghost(type_index, images, bg_img, game_engine){
    var self = this;

    var direction, direction, key;
    self.bg_img = bg_img;
    self.game_engine = game_engine;
    self.avoid_list = [ Block, Ghost ];
    self.direction_map = {
        "N": 80,
        "W": 81,
        "S": 82,
        "E": 83
    };
    self.image_set = images;
    direction = null;
    var _$rapyd$_Iter9 = Object.keys(self.direction_map);
    for (var _$rapyd$_Index9 = 0; _$rapyd$_Index9 < _$rapyd$_Iter9.length; _$rapyd$_Index9++) {
        key = _$rapyd$_Iter9[_$rapyd$_Index9];
        if (self.direction_map[key] == type_index) {
            direction = key;
            break;
        }
    }
    self.set_new_direction(direction);
    self.turn_priority = [ "F", "L", "R", "B" ];
};
Ghost.prototype = new Monster();
Ghost.prototype.constructor = Ghost;
Ghost.prototype.set_new_direction = function(direction){
    var self = this;
    var type_index;
    type_index = self.direction_map[direction];
    self.direction = direction;
    self.img = self.image_set[type_index];
};

function Frog(type_index, images, bg_img, game_engine){
    var self = this;
    self.bg_img = bg_img;
    self.game_engine = game_engine;
    self.img = images[type_index];
};
Frog.prototype = new Monster();
Frog.prototype.constructor = Frog;

function Walker(type_index, images, bg_img, game_engine){
    var self = this;
    self.bg_img = bg_img;
    self.game_engine = game_engine;
    self.img = images[type_index];
};
Walker.prototype = new Monster();
Walker.prototype.constructor = Walker;

function Blob(type_index, images, bg_img, game_engine){
    var self = this;
    self.bg_img = bg_img;
    self.game_engine = game_engine;
    self.img = images[type_index];
};
Blob.prototype = new Monster();
Blob.prototype.constructor = Blob;

function Centipede(type_index, images, bg_img, game_engine){
    var self = this;

    var direction, direction, key;
    self.bg_img = bg_img;
    self.game_engine = game_engine;
    self.avoid_list = [ Block, Centipede ];
    self.direction_map = {
        "N": 96,
        "W": 97,
        "S": 98,
        "E": 99
    };
    self.image_set = images;
    direction = null;
    var _$rapyd$_Iter10 = Object.keys(self.direction_map);
    for (var _$rapyd$_Index10 = 0; _$rapyd$_Index10 < _$rapyd$_Iter10.length; _$rapyd$_Index10++) {
        key = _$rapyd$_Iter10[_$rapyd$_Index10];
        if (self.direction_map[key] == type_index) {
            direction = key;
            break;
        }
    }
    self.set_new_direction(direction);
    self.turn_priority = [ "R", "F", "L", "B" ];
};
Centipede.prototype = new Monster();
Centipede.prototype.constructor = Centipede;
Centipede.prototype.set_new_direction = function(direction){
    var self = this;
    var type_index;
    type_index = self.direction_map[direction];
    self.direction = direction;
    self.img = self.image_set[type_index];
};

direction_dpos_dict = {
    "UP": "N",
    "DOWN": "S",
    "LEFT": "W",
    "RIGHT": "E"
};

FRAMES_PER_SLIDE = 2;

FRAMES_PER_REG = 4;

BLOCK_DIM = 48;

NUM_BLOCKS = 9;

PLAYERPOS = 4;

LEVELSIZE = 32;

PLAYER_TYPE = 1;

MONSTER_TYPE = 2;

LEVEL_RUNNING = 0;

DEAD = 1;

FINISHED = 2;

conversion_map = [ Tile, Wall, Chip, Water, Fire, HiddenWall, BlockedNorth, BlockedWest, BlockedSouth, BlockedEast, Block, Dirt, Ice, ForceSouth, CloneNorth, CloneWest, CloneSouth, CloneEast, ForceNorth, ForceEast, ForstWest, Exit, DoorBlue, DoorRed, DoorGreen, DoorYellow, IceSE, IceSW, IceNW, IceNE, BlueNone, BlueWall, null, Theif, Socket, ButtonGreen, ButtonRed, SwitchedWall, SwitchedWall, ButtonBrown, ButtonBlue, Teleport, Bomb, Trap, SemiHiddenWall, Gravel, PassWall, Hint, BlockedSE, Cloner, ForceAll, Player, Player, Player, null, null, null, Player, Exit, Exit, Player, Player, Player, Player, Bug, Bug, Bug, Bug, FireBug, FireBug, FireBug, FireBug, PinkBall, PinkBall, PinkBall, PinkBall, Tank, Tank, Tank, Tank, Ghost, Ghost, Ghost, Ghost, Frog, Frog, Frog, Frog, Walker, Walker, Walker, Walker, Blob, Blob, Blob, Blob, Centipede, Centipede, Centipede, Centipede, KeyBlue, KeyRed, KeyGreen, KeyYellow, Flippers, FireBoots, Skates, SuctionBoots, Player, Player, Player, Player ];

image_map = [ "tile1.png", "tile2.png", "cyb002.png", "cyb003.png", "cyb004.png", "tile1.png", "BlockedNorth", "BlockedWest", "cyb008.png", "BlockedEast", "box.png", "cyb011.png", "cyb012.png", "slideD.png", "CloneNorth", "CloneWest", "CloneSouth", "CloneEast", "slideU.png", "slideR.png", "slideL.png", "exit.png", "cyb022.png", "cyb023.png", "cyb024.png", "cyb025.png", "cyb026.png", "cyb027.png", "cyb028.png", "cyb029.png", "cyb030.png", "cyb030.png", "None", "cyb033.png", "cyb034.gif", "cyb035.png", "cyb036.png", "cyb037.png", "cyb038.png", "cyb039.png", "cyb040.png", "cyb041.png", "cyb042.png", "cyb043.png", "tile1.png", "cyb045.gif", "cyb046.png", "cyb047.png", "BlockedSE", "cyb049.gif", "ForceAll", "borg2.png", "borg2.png", "borg2.png", "None", "None", "None", "Player", "exit.png", "exit.png", "borg2.png", "borg2.png", "borg2.png", "borg2.png", "cyb064.png", "cyb065.png", "cyb066.png", "cyb067.png", "cyb068.png", "cyb069.png", "cyb070.png", "cyb071.png", "cyb072.png", "cyb073.png", "cyb074.png", "cyb075.png", "cyb076.png", "cyb077.png", "cyb078.png", "cyb079.png", "cyb080.png", "cyb081.png", "cyb082.png", "cyb083.png", "Frog", "Frog", "Frog", "Frog", "Walker", "Walker", "Walker", "Walker", "Blob", "Blob", "Blob", "Blob", "cyb096.png", "cyb097.png", "cyb098.png", "cyb099.png", "cyb100.gif", "cyb101.gif", "cyb102.gif", "cyb103.gif", "cyb104.png", "cyb105.png", "cyb106.png", "cyb107.png", "borg2.png", "borg2.png", "borg2.png", "borg2.png" ];

bg_image = [ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0, null, null, null, null, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 0, 0, null, null, null, null ];

function object_generator(index, loaded_images, game_model) {
    var object_class, bg_img, bg_img;
    object_class = conversion_map[index];
    if (bg_image[index] != null) {
        bg_img = loaded_images[bg_image[index]];
    } else {
        bg_img = null;
    }
    return new object_class(index, loaded_images, bg_img, game_model);
}

function enum_is_item(itemEnum) {
    if (itemEnum == 10) {
        return true;
    } else if (itemEnum > 59 && itemEnum < 100) {
        return true;
    } else if (itemEnum > 107 && itemEnum < 111) {
        return true;
    } else {
        return false;
    }
}

function enum_is_monster(itemEnum) {
    if (itemEnum > 63 && itemEnum < 100) {
        return true;
    }
    return false;
}

function randfloat(min, max) {
    return Math.random() * (max - min) + min;
}

function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Cyborg(canvas){
    var self = this;























    self.canvas = canvas;
    self.msg_div = document.getElementById("message");
};
Cyborg.prototype.end_game = function(){
    var self = this;
    Alertify.dialog.alert("Thank you for playing!<br><br>Written by Charles Law<br>Check " + "out other projects I work on:<br>" + '<a href="http://www.grafpad.com" target="_blank">Grafpad</a><br>' + '<a href="http://rapydscript.pyjeon.com" target="_blank">RapydScript</a>', function() {
        self.controller._start_game();
    });
};
Cyborg.prototype.set_msg = function(msg){
    var self = this;
    self.msg_div.innerHTML = msg;
};
Cyborg.prototype.start_level = function(controller, start_pos, map, items, level_info, images, links, creature_links, trap_controls, clone_controles){
    var self = this;
    var but_x, but_y, trap_x, trap_y, player_item, inv_items, inv_item;
    self.controller = controller;
    self.x = start_pos[0];
    self.y = start_pos[1];
    self.map = map;
    self.items = items;
    self.images = images;
    self.num_chips = level_info[1];
    self.chips_left = level_info[1];
    self.hint = level_info[2];
    self.game_state = LEVEL_RUNNING;
    self.links = links;
    self.creature_links = creature_links;
    trap_controls = trap_controls;
    clone_controles = clone_controles;
    self.slip_list = [];
    self._set_creature_links();
    self.set_chips_text();
    self.reset_inventory_ui();
    self.set_msg("Password:<br>" + level_info[3]);
    var _$rapyd$_Iter11 = trap_controls;
    for (var _$rapyd$_Index11 = 0; _$rapyd$_Index11 < _$rapyd$_Iter11.length; _$rapyd$_Index11++) {
        _$rapyd$_Unpack = _$rapyd$_Iter11[_$rapyd$_Index11];
        but_x = _$rapyd$_Unpack[0];
        but_y = _$rapyd$_Unpack[1];
        trap_x = _$rapyd$_Unpack[2];
        trap_y = _$rapyd$_Unpack[3];
        self.map[but_x][but_y].set_trap(trap_x, trap_y);
    }
    var _$rapyd$_Iter12 = clone_controles;
    for (var _$rapyd$_Index12 = 0; _$rapyd$_Index12 < _$rapyd$_Iter12.length; _$rapyd$_Index12++) {
        _$rapyd$_Unpack = _$rapyd$_Iter12[_$rapyd$_Index12];
        but_x = _$rapyd$_Unpack[0];
        but_y = _$rapyd$_Unpack[1];
        trap_x = _$rapyd$_Unpack[2];
        trap_y = _$rapyd$_Unpack[3];
        self.map[but_x][but_y].set_trap(trap_x, trap_y);
    }
    player_item = self.items[self.x][self.y];
    inv_items = [ "key_red", "key_green" ];
    var _$rapyd$_Iter13 = inv_items;
    for (var _$rapyd$_Index13 = 0; _$rapyd$_Index13 < _$rapyd$_Iter13.length; _$rapyd$_Index13++) {
        inv_item = _$rapyd$_Iter13[_$rapyd$_Index13];
        player_item.set_inventory_icon(inv_item, undefined);
    }
};
Cyborg.prototype.is_player_sliding = function(){
    var self = this;
    "\n        See if the player is sliding\n        ";
    return self.items[self.x][self.y].is_slipping;
};
Cyborg.prototype._set_creature_links = function(){
    var self = this;
    var pos_x, pos_y, i;
    "\n        Goes through the creature link list and set on the monster\n        ";
    for (i = 0; i < len(self.creature_links); i++) {
        _$rapyd$_Unpack = self.creature_links[i];
        pos_x = _$rapyd$_Unpack[0];
        pos_y = _$rapyd$_Unpack[1];
        self.items[pos_x][pos_y].creature_link = i;
    }
};
Cyborg.prototype.kill_monster = function(x, y){
    var self = this;
    var found_moving_monster, pos_x, pos_y, found_moving_monster, i, pos_x, pos_y;
    "\n        Right now this only supports a player killing a monster\n        ";
    found_moving_monster = false;
    for (i = len(self.creature_links) - 1; i > -1; i--) {
        _$rapyd$_Unpack = self.creature_links[i];
        pos_x = _$rapyd$_Unpack[0];
        pos_y = _$rapyd$_Unpack[1];
        if (pos_x == x && pos_y == y) {
            self.creature_links.splice(i, 1);
            found_moving_monster = true;
        }
    }
    if (found_moving_monster) {
        self._set_creature_links();
    }
    for (i = len(self.slip_list) - 1; i > -1; i--) {
        _$rapyd$_Unpack = self.slip_list[i].slice(0, 2);
        pos_x = _$rapyd$_Unpack[0];
        pos_y = _$rapyd$_Unpack[1];
        if (pos_x == x && pos_y == y) {
            console.log("kill monster s" + i);
            self.slip_list.splice(i, 1);
        }
    }
    self.items[x][y] = null;
};
Cyborg.prototype.move_monsters = function(){
    var self = this;
    var pos_x, pos_y, new_x, new_y, i;
    for (i = len(self.creature_links) - 1; i > -1; i--) {
        _$rapyd$_Unpack = self.creature_links[i];
        pos_x = _$rapyd$_Unpack[0];
        pos_y = _$rapyd$_Unpack[1];
        try {
            _$rapyd$_Unpack = self.items[pos_x][pos_y].move(pos_x, pos_y);
            new_x = _$rapyd$_Unpack[0];
            new_y = _$rapyd$_Unpack[1];
        } catch (_$rapyd$_Exception) {
            if (_$rapyd$_Exception instanceof MonsterKilled) {
                var exc = _$rapyd$_Exception;
                self.items[pos_x][pos_y] = null;
                self.creature_links.splice(i, 1);
                self._set_creature_links();
            } else if (_$rapyd$_Exception instanceof PlayerKilled) {
                var exc = _$rapyd$_Exception;
                throw exc;
            } else {
                var e = _$rapyd$_Exception;
                console.log("MM Error" + pos_x + "," + pos_y + " " + e);
            } 
        }
    }
};
Cyborg.prototype.switch_green_doors = function(){
    var self = this;
    var pos_x, pos_y;
    var _$rapyd$_Iter14 = self.links["GREEN_BUTTON"];
    for (var _$rapyd$_Index14 = 0; _$rapyd$_Index14 < _$rapyd$_Iter14.length; _$rapyd$_Index14++) {
        _$rapyd$_Unpack = _$rapyd$_Iter14[_$rapyd$_Index14];
        pos_x = _$rapyd$_Unpack[0];
        pos_y = _$rapyd$_Unpack[1];
        self.map[pos_x][pos_y].flip_wall();
    }
};
Cyborg.prototype.turn_tanks = function(){
    var self = this;
    var pos_x, pos_y;
    var _$rapyd$_Iter15 = self.creature_links;
    for (var _$rapyd$_Index15 = 0; _$rapyd$_Index15 < _$rapyd$_Iter15.length; _$rapyd$_Index15++) {
        _$rapyd$_Unpack = _$rapyd$_Iter15[_$rapyd$_Index15];
        pos_x = _$rapyd$_Unpack[0];
        pos_y = _$rapyd$_Unpack[1];
        if (self.items[pos_x][pos_y] instanceof Tank) {
            self.items[pos_x][pos_y].trigger();
        }
    }
};
Cyborg.prototype.get_teleport_ind = function(pos_x, pos_y){
    var self = this;
    var ind, tel_x, tel_y, ind, i;
    ind = -1;
    for (i = 0; i < len(self.links["TELEPORTS"]); i++) {
        _$rapyd$_Unpack = self.links["TELEPORTS"][i];
        tel_x = _$rapyd$_Unpack[0];
        tel_y = _$rapyd$_Unpack[1];
        if (tel_x == pos_x && tel_y == pos_y) {
            ind = i;
            break;
        }
    }
    return ind;
};
Cyborg.prototype.get_teleport_pos = function(ind){
    var self = this;
    return self.links["TELEPORTS"][ind];
};
Cyborg.prototype.get_next_teleport_ind = function(ind){
    var self = this;
    var pre_ind, pre_ind;
    pre_ind = ind - 1;
    if (pre_ind < 0) {
        pre_ind = len(self.links["TELEPORTS"]) + pre_ind;
    }
    return pre_ind;
};
Cyborg.prototype.get_num_teleports = function(){
    var self = this;
    return len(self.links["TELEPORTS"]);
};
Cyborg.prototype.get_next_teleport = function(pos_x, pos_y){
    var self = this;
    var ind, pre_ind, pre_ind;
    ind = self.get_teleport_ind(pos_x, pos_y);
    if (ind < 0) {
        return [null, null];
    }
    if (ind == 0) {
        pre_ind = len(self.links["TELEPORTS"]) - 1;
    } else {
        pre_ind = ind - 1;
    }
    return self.get_teleport_pos(pre_ind);
};
Cyborg.prototype.have_all_chips = function(){
    var self = this;
    if (self.chips_left > 0) {
        return false;
    } else {
        return true;
    }
};
Cyborg.prototype.reset_inventory_ui = function(){
    var self = this;
    var items, item;
    items = document.getElementsByClassName("item");
    var _$rapyd$_Iter16 = items;
    for (var _$rapyd$_Index16 = 0; _$rapyd$_Index16 < _$rapyd$_Iter16.length; _$rapyd$_Index16++) {
        item = _$rapyd$_Iter16[_$rapyd$_Index16];
        item.style.backgroundImage = "";
    }
};
Cyborg.prototype.set_chips_text = function(){
    var self = this;
    var chips_div, num_chars, pad, chips_text;
    chips_div = document.getElementById("count");
    num_chars = 3;
    pad = new Array(1 + num_chars).join("0");
    chips_text = (pad + self.chips_left).slice(-pad.length);
    chips_div.innerHTML = chips_text;
};
Cyborg.prototype.get_chip = function(){
    var self = this;
    self.chips_left -= 1;
    self.set_chips_text();
};
Cyborg.prototype.move_player = function(key_direction){
    var self = this;
    var direction, player_item;
    direction = direction_dpos_dict[key_direction];
    player_item = self.items[self.x][self.y];
    player_item.valid_move(self.x, self.y, direction, null);
    if (self.game_state == FINISHED) {
        self.controller.new_level(true);
    }
};
Cyborg.prototype.run_slips = function(){
    var self = this;
    var i, more_items_to_slip, pos_x, pos_y, direction, slip_item, valid_move, new_x, new_y, i, more_items_to_slip;
    i = 0;
    more_items_to_slip = i < len(self.slip_list);
    while (more_items_to_slip) {
        _$rapyd$_Unpack = self.slip_list[i];
        pos_x = _$rapyd$_Unpack[0];
        pos_y = _$rapyd$_Unpack[1];
        direction = _$rapyd$_Unpack[2];
        slip_item = self.items[pos_x][pos_y];
        _$rapyd$_Unpack = slip_item.valid_move(pos_x, pos_y, direction, i);
        valid_move = _$rapyd$_Unpack[0];
        new_x = _$rapyd$_Unpack[1];
        new_y = _$rapyd$_Unpack[2];
        i += 1;
        more_items_to_slip = i < len(self.slip_list);
    }
};
Cyborg.prototype.update = function(){
    var self = this;
    self.draw();
};
Cyborg.prototype.draw = function(){
    var self = this;
    self.refresh();
};
Cyborg.prototype.refresh = function(){
    var self = this;
    var startX, startY, ctx, dispx, dispy, dispy, map_y, dispx, map_x;
    startX = Math.min(Math.max(0, self.x - PLAYERPOS), LEVELSIZE - NUM_BLOCKS);
    startY = Math.min(Math.max(0, self.y - PLAYERPOS), LEVELSIZE - NUM_BLOCKS);
    ctx = self.canvas.getContext("2d");
    ctx.save();
    dispx = 0;
    for (map_x = startX; map_x < startX + NUM_BLOCKS; map_x++) {
        dispy = 0;
        for (map_y = startY; map_y < startY + NUM_BLOCKS; map_y++) {
            if (self.map[map_x][map_y]) {
                self.map[map_x][map_y].draw(ctx, dispx, dispy);
            }
            if (self.items[map_x][map_y]) {
                self.items[map_x][map_y].draw(ctx, dispx, dispy);
            }
            dispy += BLOCK_DIM;
        }
        dispx += BLOCK_DIM;
    }
    ctx.restore();
};





LEVELSIZE = 32;

BYTE = 2;

WORD = 4;

function ord(x) {
    if (typeof x == "string" && len(x) == 1) {
        return x.charCodeAt(0);
    }
    throw TypeError("Expected string of length 1");
}

function Level(layerOne, layerTwo, lvlInfo, creature_links, trap_controls, clone_controles){
    var self = this;
    self.layerOne = layerOne;
    self.layerTwo = layerTwo;
    self.lvlInfo = lvlInfo;
    self.creature_links = creature_links;
    self.trap_controls = trap_controls;
    self.clone_controles = clone_controles;
};

function LevelSet(){
    var self = this;




    self.levelList = [];
};
LevelSet.prototype.addLevel = function(layerOne, layerTwo, lvlInfo, creature_links, trap_controls, clone_controles){
    var self = this;
    self.levelList.push(new Level(layerOne, layerTwo, lvlInfo, creature_links, trap_controls, clone_controles));
};
LevelSet.prototype.getLevel = function(lvlNum){
    var self = this;
    var lvl;
    lvl = self.levelList[lvlNum - 1];
    return [lvl.layerOne, lvl.layerTwo, lvl.lvlInfo, lvl.creature_links, lvl.trap_controls, 
    lvl.clone_controles];
};
LevelSet.prototype.get_num_levels = function(){
    var self = this;
    return len(self.levelList);
};
LevelSet.prototype.try_password = function(password){
    var self = this;
    var i;
    "\n        Assume this will not happen very often so just iterate thru levels\n        ";
    for (i = 0; i < len(self.levelList); i++) {
        if (self.levelList[i].lvlInfo[3] == password) {
            return i;
        }
    }
    return null;
};

function LevelLoader(controller, filename){
    var self = this;







    var main, client;
    self.controller = controller;
    main = self;
    client = new XMLHttpRequest();
    client.onreadystatechange = function() {
        console.log(this.readyState);
        if (this.readyState == this.DONE) {
            if (this.response != null) {
                self.on_download_complete(this.response);
            }
        }
    };
    client.open("GET", filename, false);
    client.send();
};
LevelLoader.prototype.on_download_complete = function(text){
    var self = this;
    var levelSet;
    levelSet = self.parseDataFile(text);
    self.controller.level_loaded(levelSet);
};
LevelLoader.prototype.string2decWord = function(string){
    var self = this;
    var tmp1, tmp2;
    tmp1 = self.string2decByte(string.slice(BYTE, 2 * BYTE));
    tmp2 = self.string2decByte(string.slice(0, BYTE));
    return (tmp1 << 8) + tmp2;
};
LevelLoader.prototype.string2decByte = function(string){
    var self = this;
    var didg1, didg2;
    didg1 = self.string2decDidget(string[0]) * 16;
    didg2 = self.string2decDidget(string[1]);
    return didg1 + didg2;
};
LevelLoader.prototype.string2decDidget = function(string){
    var self = this;
    var ordInt;
    ordInt = ord(string);
    if (ordInt == 48) {
        return 0;
    } else if (ordInt < 58) {
        return ordInt - 48;
    } else {
        return ordInt - 87;
    }
};
LevelLoader.prototype.readMapLayer = function(text, currPos){
    var self = this;
    var layerBytes, layerInfo, bytesLeft, objectCode, numCopies, objectCode, i, bytesLeft, bytesLeft, objArray;
    layerBytes = self.string2decWord(text.slice(currPos, currPos + WORD));
    currPos += WORD;
    layerInfo = [];
    bytesLeft = layerBytes;
    while (bytesLeft > 0) {
        objectCode = self.string2decByte(text.slice(currPos, currPos + BYTE));
        currPos += BYTE;
        if (objectCode == 255) {
            numCopies = self.string2decByte(text.slice(currPos, currPos + BYTE));
            currPos += BYTE;
            objectCode = self.string2decByte(text.slice(currPos, currPos + BYTE));
            currPos += BYTE;
            for (i = 0; i < numCopies; i++) {
                layerInfo.push(objectCode);
            }
            bytesLeft = bytesLeft - 3;
        } else {
            layerInfo.push(objectCode);
            bytesLeft = bytesLeft - 1;
        }
    }
    objArray = [];
    for (i = 0; i < LEVELSIZE; i++) {
        objArray.push(layerInfo.slice(i * LEVELSIZE, i * LEVELSIZE + 32));
    }
    return [layerBytes, objArray, currPos];
};
LevelLoader.prototype.read_optional_info = function(text, currPos, left){
    var self = this;
    var creature_links, trap_controls, clone_controles, map_hint, map_password, field_type, field_size, xpos, ypos, monster_num, but_xpos, but_ypos, trap_xpos, trap_ypos, trap_num, but_xpos, but_ypos, trap_xpos, trap_ypos, clone_num, map_password, i, num_text, map_hint, i;
    creature_links = [];
    trap_controls = [];
    clone_controles = [];
    map_hint = "";
    map_password = "";
    while (left > 0) {
        field_type = self.string2decByte(text.slice(currPos, currPos + BYTE));
        currPos += BYTE;
        field_size = self.string2decByte(text.slice(currPos, currPos + BYTE)) * BYTE;
        currPos += BYTE;
        left -= BYTE + BYTE;
        if (field_type == 10) {
            for (monster_num = 0; monster_num < field_size / BYTE / 2; monster_num++) {
                xpos = self.string2decByte(text.slice(currPos, currPos + BYTE));
                currPos += BYTE;
                left -= BYTE;
                ypos = self.string2decByte(text.slice(currPos, currPos + BYTE));
                currPos += BYTE;
                left -= BYTE;
                creature_links.push([ xpos, ypos ]);
            }
        } else if (field_type == 4) {
            for (trap_num = 0; trap_num < field_size / WORD / 5; trap_num++) {
                but_xpos = self.string2decWord(text.slice(currPos, currPos + WORD));
                currPos += WORD;
                left -= WORD;
                but_ypos = self.string2decWord(text.slice(currPos, currPos + WORD));
                currPos += WORD;
                left -= WORD;
                trap_xpos = self.string2decWord(text.slice(currPos, currPos + WORD));
                currPos += WORD;
                left -= WORD;
                trap_ypos = self.string2decWord(text.slice(currPos, currPos + WORD));
                currPos += WORD;
                left -= WORD;
                currPos += WORD;
                left -= WORD;
                trap_controls.push([ but_xpos, but_ypos, trap_xpos, trap_ypos ]);
            }
        } else if (field_type == 5) {
            for (clone_num = 0; clone_num < field_size / WORD / 4; clone_num++) {
                but_xpos = self.string2decWord(text.slice(currPos, currPos + WORD));
                currPos += WORD;
                left -= WORD;
                but_ypos = self.string2decWord(text.slice(currPos, currPos + WORD));
                currPos += WORD;
                left -= WORD;
                trap_xpos = self.string2decWord(text.slice(currPos, currPos + WORD));
                currPos += WORD;
                left -= WORD;
                trap_ypos = self.string2decWord(text.slice(currPos, currPos + WORD));
                currPos += WORD;
                left -= WORD;
                clone_controles.push([ but_xpos, but_ypos, trap_xpos, trap_ypos ]);
            }
        } else if (field_type == 6) {
            for (i = currPos; i < currPos + field_size - 2; i+=2) {
                map_password += String.fromCharCode(self.string2decByte(text.slice(i, i + 2)) ^ 153);
            }
            currPos += field_size;
            left -= field_size;
        } else if (field_type == 7) {
            num_text = field_size / 2;
            for (i = currPos; i < currPos + field_size - 2; i+=2) {
                map_hint += String.fromCharCode(self.string2decByte(text.slice(i, i + 2)));
            }
            currPos += field_size;
            left -= field_size;
        } else {
            currPos += field_size;
            left -= field_size;
        }
    }
    return [creature_links, trap_controls, clone_controles, map_hint, map_password];
};
LevelLoader.prototype.parseDataFile = function(text){
    var self = this;
    var currPos, numLevels, currPos, levelSet, currLevelBytes, currPos, currPos, currLevelTimeLim, currPos, currLevelChips, currPos, levelLeft, currPos, levelLeft, layerBytes, layerOne, currPos, levelLeft, layerBytes, layerTwo, currPos, levelLeft, levelLeft, currPos, creature_links, trap_controls, clone_controles, map_hint, map_password, currPos, lvlInfo, i;
    currPos = 4 * BYTE;
    numLevels = self.string2decWord(text.slice(currPos, currPos + WORD));
    currPos += WORD;
    levelSet = new LevelSet();
    for (i = 0; i < numLevels; i++) {
        currLevelBytes = self.string2decWord(text.slice(currPos, currPos + WORD));
        currPos += WORD;
        currPos += WORD;
        currLevelTimeLim = self.string2decWord(text.slice(currPos, currPos + WORD));
        currPos += WORD;
        currLevelChips = self.string2decWord(text.slice(currPos, currPos + WORD));
        currPos += WORD;
        levelLeft = (currLevelBytes - 6) * BYTE;
        currPos += WORD;
        levelLeft = levelLeft - WORD;
        _$rapyd$_Unpack = self.readMapLayer(text, currPos);
        layerBytes = _$rapyd$_Unpack[0];
        layerOne = _$rapyd$_Unpack[1];
        currPos = _$rapyd$_Unpack[2];
        levelLeft = levelLeft - layerBytes * BYTE - WORD;
        _$rapyd$_Unpack = self.readMapLayer(text, currPos);
        layerBytes = _$rapyd$_Unpack[0];
        layerTwo = _$rapyd$_Unpack[1];
        currPos = _$rapyd$_Unpack[2];
        levelLeft = levelLeft - layerBytes * BYTE - WORD;
        levelLeft = self.string2decWord(text.slice(currPos, currPos + WORD)) * BYTE;
        currPos += WORD;
        _$rapyd$_Unpack = self.read_optional_info(text, currPos, levelLeft);
        creature_links = _$rapyd$_Unpack[0];
        trap_controls = _$rapyd$_Unpack[1];
        clone_controles = _$rapyd$_Unpack[2];
        map_hint = _$rapyd$_Unpack[3];
        map_password = _$rapyd$_Unpack[4];
        currPos += levelLeft;
        lvlInfo = [ currLevelTimeLim, currLevelChips, map_hint, map_password ];
        levelSet.addLevel(layerOne, layerTwo, lvlInfo, creature_links, trap_controls, clone_controles);
    }
    return levelSet;
};



FPS = 20;

INIT = 0;

READY = 1;

RUNNING = 2;

DEAD = 3;

function Controller(game_engine){
    var self = this;












    self.game_engine = game_engine;
    self.key_up = false;
    self.key_down = false;
    self.key_left = false;
    self.key_right = false;
    self.key_fire = false;
    self.pressed_key = null;
    self.pw_up = false;
    self.state = INIT;
    self.levels_finished_loading = false;
    new LevelLoader(self, "full.txt");
    self.images_finished_loading = false;
    self.load_images();
};
Controller.prototype.load_images = function(){
    var self = this;
    var num_images, num_images, i;
    self.number_images_loaded = 0;
    self.img = (function() {
        var _$rapyd$_Iter = image_map, _$rapyd$_Result = [], image;
        for (var _$rapyd$_Index = 0; _$rapyd$_Index < _$rapyd$_Iter.length; _$rapyd$_Index++) {
            image = _$rapyd$_Iter[_$rapyd$_Index];
            _$rapyd$_Result.push(new Image());
        }
        return _$rapyd$_Result;
    })();
    num_images = len(image_map);
    for (i = 0; i < len(image_map); i++) {
        if (image_map[i].indexOf(".") < 0) {
            num_images -= 1;
        } else {
            self.img[i].src = "./images/" + image_map[i];
            self.img[i].onload = function() {
                self.number_images_loaded += 1;
                if (self.number_images_loaded >= num_images) {
                    self.images_loaded();
                }
            };
        }
    }
};
Controller.prototype.password = function(){
    var self = this;
    self.pw_up = true;
    Alertify.dialog.prompt("Enter a Password", function(input_pw) {
        var level_num;
        self.pw_up = false;
        if (self.levels_finished_loading) {
            level_num = self.level_set.try_password(input_pw);
            if (level_num !== null) {
                self.level_num = level_num + 1;
                self.start_current_level();
                return;
            }
        }
        Alertify.dialog.alert("Invalid Password");
    }, function() {
        self.pw_up = false;
    }, "");
};
Controller.prototype.images_loaded = function(){
    var self = this;
    console.log("ImagesLoaded");
    self.images_finished_loading = true;
    if (self.levels_finished_loading) {
        self._start_game();
    }
};
Controller.prototype._start_game = function(){
    var self = this;
    self.level_num = 1;
    self.start_current_level();
};
Controller.prototype.level_loaded = function(level_set){
    var self = this;
    console.log("LevelsLoaded");
    self.level_set = level_set;
    self.levels_finished_loading = true;
    if (self.images_finished_loading) {
        self._start_game();
    }
};
Controller.prototype.read_level_set = function(level_num){
    var self = this;
    var map, items, links, i, layer_one, layer_two, level_info, creature_links, trap_controls, clone_controles, start_pos, item_enum, floor_enum, item_enum, floor_enum, floor_enum, start_pos, x, y, creature_links_copy, creature_link, but_xpos, but_ypos, cloner_xpos, cloner_ypos, cloned_enum, clonelink, x, y;
    map = new Array(LEVELSIZE);
    items = new Array(LEVELSIZE);
    links = {
        "GREEN_BUTTON": [],
        "TELEPORTS": []
    };
    for (i = 0; i < LEVELSIZE; i++) {
        map[i] = new Array(LEVELSIZE);
        items[i] = new Array(LEVELSIZE);
    }
    _$rapyd$_Unpack = self.level_set.getLevel(level_num);
    layer_one = _$rapyd$_Unpack[0];
    layer_two = _$rapyd$_Unpack[1];
    level_info = _$rapyd$_Unpack[2];
    creature_links = _$rapyd$_Unpack[3];
    trap_controls = _$rapyd$_Unpack[4];
    clone_controles = _$rapyd$_Unpack[5];
    start_pos = [ 0, 0 ];
    for (y = 0; y < LEVELSIZE; y++) {
        for (x = 0; x < LEVELSIZE; x++) {
            item_enum = 0;
            floor_enum = 0;
            if (enum_is_item(layer_one[y][x])) {
                if (item_enum) {
                    console.log("Bad Level");
                    throw Exception;
                } else {
                    item_enum = layer_one[y][x];
                }
                if (!enum_is_item(layer_two[y][x])) {
                    floor_enum = layer_two[y][x];
                }
            } else {
                floor_enum = layer_one[y][x];
            }
            if (item_enum == 110) {
                start_pos = [ x, y ];
            }
            if (item_enum) {
                items[x][y] = object_generator(item_enum, self.img, self.game_engine);
            } else {
                items[x][y] = null;
            }
            map[x][y] = object_generator(floor_enum, self.img, self.game_engine);
            if (floor_enum == 37 || floor_enum == 38) {
                links["GREEN_BUTTON"].push([ x, y ]);
            } else if (floor_enum == 41) {
                links["TELEPORTS"].push([ x, y ]);
            }
        }
    }
    creature_links_copy = [];
    var _$rapyd$_Iter17 = creature_links;
    for (var _$rapyd$_Index17 = 0; _$rapyd$_Index17 < _$rapyd$_Iter17.length; _$rapyd$_Index17++) {
        creature_link = _$rapyd$_Iter17[_$rapyd$_Index17];
        creature_links_copy.unshift(creature_link);
    }
    var _$rapyd$_Iter18 = clone_controles;
    for (var _$rapyd$_Index18 = 0; _$rapyd$_Index18 < _$rapyd$_Iter18.length; _$rapyd$_Index18++) {
        clonelink = _$rapyd$_Iter18[_$rapyd$_Index18];
        _$rapyd$_Unpack = clonelink;
        but_xpos = _$rapyd$_Unpack[0];
        but_ypos = _$rapyd$_Unpack[1];
        cloner_xpos = _$rapyd$_Unpack[2];
        cloner_ypos = _$rapyd$_Unpack[3];
        cloned_enum = layer_one[cloner_ypos][cloner_xpos];
        map[cloner_xpos][cloner_ypos].set_cloned(items, cloned_enum, cloner_xpos, cloner_ypos);
        map[but_xpos][but_ypos].link_cloner(cloner_xpos, cloner_ypos);
    }
    for (i = len(creature_links_copy) - 1; i > -1; i--) {
        _$rapyd$_Unpack = creature_links_copy[i];
        x = _$rapyd$_Unpack[0];
        y = _$rapyd$_Unpack[1];
        if (items[x][y] == null) {
            creature_links_copy.splice(i, 1);
        }
    }
    return [start_pos, map, items, links, level_info, creature_links_copy, trap_controls, 
    clone_controles];
};
Controller.prototype.start_current_level = function(){
    var self = this;
    var start_pos, map, items, links, level_info, creature_links, trap_controls, clone_controles;
    _$rapyd$_Unpack = self.read_level_set(self.level_num);
    start_pos = _$rapyd$_Unpack[0];
    map = _$rapyd$_Unpack[1];
    items = _$rapyd$_Unpack[2];
    links = _$rapyd$_Unpack[3];
    level_info = _$rapyd$_Unpack[4];
    creature_links = _$rapyd$_Unpack[5];
    trap_controls = _$rapyd$_Unpack[6];
    clone_controles = _$rapyd$_Unpack[7];
    self.game_engine.start_level(self, start_pos, map, items, level_info, self.img, links, creature_links, trap_controls, clone_controles);
    self.state = READY;
    self.queue_move = null;
    self.used_move = false;
    self.update();
};
Controller.prototype.new_level = function(incriment){
    var self = this;
    clearInterval(self.timer_id);
    if (incriment) {
        self.level_num += 1;
        if (self.level_num > self.level_set.get_num_levels()) {
            self.game_engine.end_game();
            return;
        }
    }
    self.start_current_level();
};
Controller.prototype.keyboard_input = function(direction, set){
    var self = this;
    if (set) {
        self.made_move = direction;
        if (!self.pressed_key) {
            self.press_delay = true;
            self.just_pressed = true;
            self.hold_delay = 2;
        }
        self.pressed_key = direction;
    } else {
        self.pressed_key = null;
        self.press_delay = false;
        self.just_pressed = false;
        self.hold_delay = 0;
    }
    if (self.state == READY) {
        self.game_engine.set_msg("");
        self.half_speed_marker = false;
        self.quarter_speed_marker = false;
        self.state = RUNNING;
        self.timer_id = setInterval(function() {
            self.update();
        }, 1e3 / FPS);
    }
};
Controller.prototype.update = function(){
    var self = this;
    try {
        if (self.state < READY || self.state == DEAD) {
            return;
        }
        if (self.state == RUNNING) {
            if (self.half_speed_marker) {
                self.half_speed_updates();
                self.half_speed_marker = false;
            } else {
                self.half_speed_marker = true;
            }
        }
    } catch (_$rapyd$_Exception) {
        if (_$rapyd$_Exception instanceof PlayerKilled) {
            var exc = _$rapyd$_Exception;
            self.state = DEAD;
            Alertify.dialog.alert(exc.msg, function() {
                self.new_level(false);
            });
        } else {
            throw _$rapyd$_Exception;
        }
    }
    self.game_engine.update();
};
Controller.prototype.half_speed_updates = function(){
    var self = this;
    var pressed_key, pressed_key;
    "\n        10 m/s updates\n        ";
    if (self.made_move) {
        pressed_key = self.made_move;
    } else {
        pressed_key = self.pressed_key;
    }
    if (self.quarter_speed_marker) {
        self.quarter_speed_updates();
        self.quarter_speed_marker = false;
    } else {
        if (pressed_key && (self.just_pressed || !self.hold_delay)) {
            if (!self.queue_move) {
                if (self.used_move) {
                    self.queue_move = pressed_key;
                } else {
                    self.game_engine.move_player(pressed_key);
                    self.used_move = true;
                    if (self.just_pressed) {
                        self.just_pressed = false;
                    }
                }
            }
        }
        if (self.game_engine.is_player_sliding()) {
            self.used_move = false;
            self.just_pressed = false;
            if (self.hold_delay) {
                self.hold_delay -= 1;
            }
        }
        self.quarter_speed_marker = true;
        self.made_move = null;
        self.game_engine.run_slips();
    }
};
Controller.prototype.quarter_speed_updates = function(){
    var self = this;
    var pressed_key, pressed_key;
    "\n        5 m/s updates:\n        - keyboard\n        ";
    if (self.made_move) {
        pressed_key = self.made_move;
    } else {
        pressed_key = self.pressed_key;
    }
    if (self.hold_delay) {
        self.hold_delay -= 1;
    }
    if (self.queue_move) {
        self.game_engine.move_player(self.queue_move);
        self.queue_move = null;
        self.used_move = true;
    } else if (pressed_key && (self.just_pressed || !self.hold_delay)) {
        self.game_engine.move_player(pressed_key);
        self.used_move = true;
    } else {
        self.used_move = false;
    }
    self.just_pressed = false;
    self.game_engine.run_slips();
    self.game_engine.move_monsters();
    self.made_move = null;
};

SHOT_COLOR = "#fff";

ASTEROID_SIZE = 180;

CANVAS_DIM_X = 700;

CANVAS_DIM_Y = 600;

key_delta_pos_dict = {
    "38": "UP",
    "40": "DOWN",
    "37": "LEFT",
    "39": "RIGHT"
};

function Interface(controller){
    var self = this;

    self.controller = controller;
    document.addEventListener("keydown", function(event) {
        var r;
        r = self.setKey(event.keyCode, true);
        if (r) {
            event.preventDefault();
        }
    });
    document.addEventListener("keyup", function(event) {
        var r;
        r = self.setKey(event.keyCode, false);
        if (r) {
            event.preventDefault();
        }
    });
};
Interface.prototype.setKey = function(k, set){
    var self = this;
    var d_pos;
    if (self.controller.pw_up) {
        return false;
    }
    if (k == 82) {
        self.controller.new_level(false);
        return true;
    } else if (k == 80) {
        self.controller.password();
        return true;
    }
    d_pos = key_delta_pos_dict[new String(k)];
    if (typeof d_pos !== "undefined") {
        self.controller.keyboard_input(d_pos, set);
        return true;
    }
    return false;
};

function runGame() {
    var canvas, game_engine, controller, display;
    canvas = document.getElementById("myCanvas");
    canvas.width = 700;
    canvas.height = 500;
    game_engine = new Cyborg(canvas);
    controller = new Controller(game_engine);
    display = new Interface(controller);
}