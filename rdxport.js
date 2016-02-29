/**
 * rdxportjs a javascript library for the rivendell rdxport api.
 *  Copyright (C) 2015-2016 Peter Grassberger <petertheone@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.

 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

var Rdxport = Rdxport || {};

Rdxport.CMD_EXPORT = 1;
Rdxport.CMD_IMPORT = 2;
Rdxport.CMD_DELETEAUDIO = 3;
Rdxport.CMD_LISTGROUPS = 4;
Rdxport.CMD_LISTGROUP = 5;
Rdxport.CMD_LISTCARTS = 6;
Rdxport.CMD_LISTCART = 7;
Rdxport.CMD_LISTCUT = 8;
Rdxport.CMD_LISTCUTS = 9;
Rdxport.CMD_ADDCUT = 10;
Rdxport.CMD_REMOVECUT = 11;
Rdxport.CMD_ADDCART = 12;
Rdxport.CMD_REMOVECART = 13;
Rdxport.CMD_EDITCART = 14;
Rdxport.CMD_EDITCUT = 15;
Rdxport.CMD_EXPORT_PEAKS = 16;
Rdxport.CMD_TRIMAUDIO = 17;
Rdxport.CMD_COPYAUDIO = 18;
Rdxport.CMD_AUDIOINFO = 19;
Rdxport.CMD_LISTLOGS = 20;
Rdxport.CMD_LISTSERVICES = 21;
Rdxport.CMD_LISTLOG = 22;
Rdxport.CMD_AUDIOSTORE = 23;

Rdxport.Rdxport = function(username, token, endpoint) {
  this.username = username;
  this.token = token;
  this.endpoint = endpoint;
};

Rdxport.RdxportObject = function(username, token, endpoint) {
  Rdxport.Rdxport.call(this, username, token, endpoint);
};
Rdxport.RdxportObject.prototype = Object.create(Rdxport.Rdxport.prototype);
Rdxport.RdxportObject.prototype.constructor = Rdxport.RdxportObject;

Rdxport.Rdxport.prototype.listLog = function(name, success) {
  var command = {
    COMMAND: Rdxport.CMD_LISTLOG,
    LOGIN_NAME: this.username,
    PASSWORD: this.token,
    NAME: name
  };
  return $.post(this.endpoint, command, success, 'xml');
};

Rdxport.Rdxport.prototype.listLogs = function(options, success) {
  options = options || {};
  options.COMMAND = Rdxport.CMD_LISTLOGS;
  options.LOGIN_NAME = this.username;
  options.PASSWORD = this.token;
  return $.post(this.endpoint, options, success, 'xml');
};

Rdxport.Rdxport.prototype.listServices = function(options, success) {
  options = options || {};
  options.COMMAND = Rdxport.CMD_LISTSERVICES;
  options.LOGIN_NAME = this.username;
  options.PASSWORD = this.token;
  return $.post(this.endpoint, options, success, 'xml');
};

Rdxport.Rdxport.prototype.listGroups = function(success) {
  var command = {
    COMMAND: Rdxport.CMD_LISTGROUPS,
    LOGIN_NAME: this.username,
    PASSWORD: this.token
  };
  return $.post(this.endpoint, command, success, 'xml');
};

Rdxport.RdxportObject.prototype.listGroups = function(success) {
  Rdxport.Rdxport.call(this, success);
};

Rdxport.Rdxport.prototype.listGroup = function(groupName, success) {
  var command = {
    COMMAND: Rdxport.CMD_LISTGROUP,
    LOGIN_NAME: this.username,
    PASSWORD: this.token,
    GROUP_NAME: groupName
  };
  return $.post(this.endpoint, command, success, 'xml');
};

Rdxport.Rdxport.prototype.listCarts = function(options, success) {
  options = options || {};
  options.COMMAND = Rdxport.CMD_LISTCARTS;
  options.LOGIN_NAME = this.username;
  options.PASSWORD = this.token;
  return $.post(this.endpoint, options, success, 'xml');
};

Rdxport.Rdxport.prototype.listCart = function(cartNumber, options, success) {
  options = options || {};
  options.COMMAND = Rdxport.CMD_LISTCART;
  options.LOGIN_NAME = this.username;
  options.PASSWORD = this.token;
  options.CART_NUMBER = cartNumber;
  return $.post(this.endpoint, options, success);
};

Rdxport.Rdxport.prototype.addCart = function(groupName, type, options, success) {
  options = options || {};
  options.COMMAND = Rdxport.CMD_ADDCART;
  options.LOGIN_NAME = this.username;
  options.PASSWORD = this.token;
  options.GROUP_NAME = groupName;
  options.TYPE = type;
  return $.post(this.endpoint, options, success, 'xml');
};

Rdxport.Rdxport.prototype.editCart = function(cartNumber, options, success) {
  options = options || {};
  options.COMMAND = Rdxport.CMD_EDITCART;
  options.LOGIN_NAME = this.username;
  options.PASSWORD = this.token;
  options.CART_NUMBER = cartNumber;
  return $.post(this.endpoint, options, success, 'xml');
};

Rdxport.Rdxport.prototype.removeCart = function(cartNumber, success) {
  var command = {
    COMMAND: Rdxport.CMD_REMOVECART,
    LOGIN_NAME: this.username,
    PASSWORD: this.token,
    CART_NUMBER: cartNumber
  };
  return $.post(this.endpoint, command, success, 'xml');
};

Rdxport.Rdxport.prototype.listCuts = function(cartNumber, success) {
  var command = {
    COMMAND: Rdxport.CMD_LISTCUTS,
    LOGIN_NAME: this.username,
    PASSWORD: this.token,
    CART_NUMBER: cartNumber
  };
  return $.post(this.endpoint, command, success, 'xml');
};

Rdxport.Rdxport.prototype.listCut = function(cartNumber, cutNumber, success) {
  var command = {
    COMMAND: Rdxport.CMD_LISTCUT,
    LOGIN_NAME: this.username,
    PASSWORD: this.token,
    CART_NUMBER: cartNumber,
    CUT_NUMBER: cutNumber
  };
  return $.post(this.endpoint, command, success, 'xml');
};

Rdxport.Rdxport.prototype.addCut = function(cartNumber, success) {
  var command = {
    COMMAND: Rdxport.CMD_ADDCUT,
    LOGIN_NAME: this.username,
    PASSWORD: this.token,
    CART_NUMBER: cartNumber
  };
  return $.post(this.endpoint, command, success, 'xml');
};

Rdxport.Rdxport.prototype.editCut = function(cartNumber, cutNumber, options, success) {
  options = options || {};
  options.COMMAND = Rdxport.CMD_EDITCUT;
  options.LOGIN_NAME = this.username;
  options.PASSWORD = this.token;
  options.CART_NUMBER = cartNumber;
  options.CUT_NUMBER = cutNumber;
  return $.post(this.endpoint, options, success, 'xml');
};

Rdxport.Rdxport.prototype.addAndEditCut = function(cartNumber, options, success) {
  var self = this;
  var returnJqXHR = null;
  return this.addCut(cartNumber, success)
    .success(function(data, textStatus, jqXHR) {
      var cutNumber = $('cutAdd cut cutNumber', data).text();
      returnJqXHR = self.editCut(cartNumber, cutNumber, options, null);
    });
};

Rdxport.Rdxport.prototype.removeCut = function(cartNumber, cutNumber, success) {
  var command = {
    COMMAND: Rdxport.CMD_REMOVECUT,
    LOGIN_NAME: this.username,
    PASSWORD: this.token,
    CART_NUMBER: cartNumber,
    CUT_NUMBER: cutNumber
  };
  return $.post(this.endpoint, command, success, 'xml');
};

Rdxport.Rdxport.prototype.copyCut = function(sourceCartNumber, sourceCutNumber,
                                                 destinationCartNumber, success) {
  var self = this;
  var returnJqXHR = null;
  this.listCut(sourceCartNumber, sourceCutNumber, function(data, textStatus, jqXHR) {
    var options = {
      DESCRIPTION: $('cutList cut description', data).text()
      // todo: add more options
    };
    self.addAndEditCut(destinationCartNumber, options, function(data, textStatus, jqXHR) {
      var destinationCutNumber = $('cutAdd cut cutNumber', data).text();
      returnJqXHR = self.copyAudio(sourceCartNumber,sourceCutNumber, destinationCartNumber, destinationCutNumber, success)
        .fail(function() {
          self.removeCut(destinationCartNumber, destinationCutNumber, null);
        });
    });
  });
  return returnJqXHR;
};

Rdxport.Rdxport.prototype.moveCut = function(sourceCartNumber, sourceCutNumber,
                                                 destinationCartNumber, success) {
  var self = this;
  var returnJqXHR = null;
  this.copyCut(sourceCartNumber, sourceCutNumber, destinationCartNumber, function(data, textStatus, jqXHR) {
    returnJqXHR = self.removeCut(sourceCartNumber, sourceCutNumber, success);
  });
  return returnJqXHR;
};

Rdxport.Rdxport.prototype.copyAudio = function(sourceCartNumber, sourceCutNumber,
                                                   destinationCartNumber, destinationCutNumber, success) {
  var command = {
    COMMAND: Rdxport.CMD_COPYAUDIO,
    LOGIN_NAME: this.username,
    PASSWORD: this.token,
    SOURCE_CART_NUMBER: sourceCartNumber,
    SOURCE_CUT_NUMBER: sourceCutNumber,
    DESTINATION_CART_NUMBER: destinationCartNumber,
    DESTINATION_CUT_NUMBER: destinationCutNumber
  };
  return $.post(this.endpoint, command, success, 'xml');
};

Rdxport.Rdxport.prototype.audioInfo = function(cartNumber, cutNumber, success) {
  var command = {
    COMMAND: Rdxport.CMD_AUDIOINFO,
    LOGIN_NAME: this.username,
    PASSWORD: this.token,
    CART_NUMBER: cartNumber,
    CUT_NUMBER: cutNumber
  };
  return $.post(this.endpoint, command, success, 'xml');
};

Rdxport.Rdxport.prototype.audioStore = function(success) {
  var command = {
    COMMAND: Rdxport.CMD_AUDIOSTORE,
    LOGIN_NAME: this.username,
    PASSWORD: this.token
  };
  return $.post(this.endpoint, command, success, 'xml');
};

Rdxport.Rdxport.prototype.import = function(cartNumber, cutNumber, channels, normalizationLevel, autotrimLevel,
                                                useMetadata, filename, success) {
  var command = {
    COMMAND: Rdxport.CMD_IMPORT,
    LOGIN_NAME: this.username,
    PASSWORD: this.token,
    CART_NUMBER: cartNumber,
    CUT_NUMBER: cutNumber,
    CHANNELS: channels,
    NORMALIZATION_LEVEL: normalizationLevel,
    AUTOTRIM_LEVEL: autotrimLevel,
    USE_METADATA: useMetadata,
    FILENAME: filename
  };
  return $.post(this.endpoint, command, success, 'xml');
};

Rdxport.Rdxport.prototype.export = function(cartNumber, cutNumber, format, channels, sampleRate, bitRate,
                                                quality, startPoint, endPoint, normalizationLevel, enableMetadata,
                                                success) {
  var command = {
    COMMAND: Rdxport.CMD_EXPORT,
    LOGIN_NAME: this.username,
    PASSWORD: this.token,
    CART_NUMBER: cartNumber,
    CUT_NUMBER: cutNumber,
    FORMAT: format,
    CHANNELS: channels,
    SAMPLE_RATE: sampleRate,
    BIT_RATE: bitRate,
    QUALITY: quality,
    START_POINT: startPoint,
    END_POINT: endPoint,
    NORMALIZATION_LEVEL: normalizationLevel,
    ENABLE_METADATA: enableMetadata
  };
  return $.post(this.endpoint, command, success, 'xml');
};

Rdxport.Rdxport.prototype.exportPeaks = function(cartNumber, cutNumber, success) {
  var command = {
    COMMAND: Rdxport.CMD_EXPORT_PEAKS,
    LOGIN_NAME: this.username,
    PASSWORD: this.token,
    CART_NUMBER: cartNumber,
    CUT_NUMBER: cutNumber
  };
  return $.post(this.endpoint, command, success, 'xml');
};

Rdxport.Rdxport.prototype.trimAudio = function(cartNumber, cutNumber, trimLevel, success) {
  var command = {
    COMMAND: Rdxport.CMD_TRIMAUDIO,
    LOGIN_NAME: this.username,
    PASSWORD: this.token,
    CART_NUMBER: cartNumber,
    CUT_NUMBER: cutNumber,
    TRIM_LEVEL: trimLevel
  };
  return $.post(this.endpoint, command, success, 'xml');
};

Rdxport.Rdxport.prototype.deleteAudio = function(cartNumber, cutNumber, success) {
  var command = {
    COMMAND: Rdxport.CMD_DELETEAUDIO,
    LOGIN_NAME: this.username,
    PASSWORD: this.token,
    CART_NUMBER: cartNumber,
    CUT_NUMBER: cutNumber
  };
  return $.post(this.endpoint, command, success, 'xml');
};

Rdxport.GroupList = function() {
  this.groups = [];
};

Rdxport.Group = function(groupName, description, lowcart, highcart, normlevel, trimlevel) {
  this.xml = null;
  // looks strange but child somehow can't use $(this) otherwise.
  this.$this = $(this);

  if (arguments.length === 1) {
    this.xml = arguments[0];
    this.groupName = $('group', this.xml).text();
    this.description = $('group-description', this.xml).text();
    this.lowcart = $('group-low-cart', this.xml).text();
    this.highcart = $('group-high-cart', this.xml).text();
    this.normlevel = $('normalization-level', this.xml).text();
    this.trimlevel = $('autotrim-level', this.xml).text();
  } else {
    this.groupName = groupName;
    this.description = description;
    this.lowcart = lowcart;
    this.highcart = highcart;
    this.normlevel = normlevel;
    this.trimlevel = trimlevel;
  }

  this.carts = [];
  this.cartsByNumber = {};
};

Rdxport.Group.prototype.getCartByNumber = function(number) {
  return this.cartsByNumber[number] ? this.cartsByNumber[number] : null;
};

Rdxport.Group.prototype.addCart = function(cart) {
  this.carts.push(cart);
  this.cartsByNumber[cart.number] = cart;
};

Rdxport.Group.prototype.removeCart = function(cart) {
  var self = this;
  $.each(this.carts, function(index, currentCart){
    if(currentCart === cart) {
      self.carts.splice(index, 1);
    }
  });
  delete this.cartsByNumber[cart.number];
};

Rdxport.Group.prototype.fetchCarts = function() {
  var self = this;
  rdxport.listCarts(this.groupName, 1, function(cartsXml, status, req) {
    self.carts = [];
    self.cartsByNumber = {};

    var dbs = $('cartList', cartsXml).children();
    dbs.each(function(index, cartXml) {
      var cart = new Rdxport.Cart(cartXml, self);

      var cuts = $('cutList', cartXml).children();
      cuts.each(function(index, cut) {
        cart.cuts.push(new Rdxport.Cut(cut, cart));
      });

      self.addCart(cart);
    });
    $(self).trigger('update');
  });
};

Rdxport.Log = function(line, id, type, cartType, cartNumber, cutNumber, groupName, groupColor, title, group) {
  /*this.xml = null;

  if (arguments.length === 2) {
    this.xml = arguments[0];
    this.line = $('line', this.xml).text();
    this.id = $('id', this.xml).text();
    this.type = $('type', this.xml).text();
    this.cartType = $('cartType', this.xml).text();
    this.cartNumber = $('cartNumber', this.xml).text();
    this.cutNumber = $('cutNumber', this.xml).text();
    this.groupName = $('groupName', this.xml).text();
    this.groupColor = $('groupColor', this.xml).text();
    this.title = $('title', this.xml).text();
    this.group = arguments[1];
  } else {*/
    this.line = line;
    this.id = id;
    this.type = type;
    this.cartType = cartType;
    this.cartNumber = cartNumber;
    this.cutNumber = cutNumber;
    this.groupName = groupName;
    this.groupColor = groupColor;
    this.title = title;
    this.group = group;
  //}
};

Rdxport.Log.newFromXml = function(xml, group) {
  var log = new Rdxport.Log(
    $('line', xml).text(),
    $('id', xml).text(),
    $('type', xml).text(),
    $('cartType', xml).text(),
    $('cartNumber', xml).text(),
    $('cutNumber', xml).text(),
    $('groupName', xml).text(),
    $('groupColor', xml).text(),
    $('title', xml).text(),
    group
  );
  log.xml = xml;
  return log;
};

Rdxport.Cart = function(number, title, groupName, group) {
  this.xml = null;
  
  if (arguments.length === 2) {
    this.xml = arguments[0];
    this.number = $('number', this.xml).text();
    this.title = $('title', this.xml).text();
    this.artist = $('artist', this.xml).text();
    this.album = $('album', this.xml).text();
    this.groupName = $('groupName', this.xml).text();
    this.group = arguments[1];
  } else {
    this.number = number;
    this.title = title;
    this.groupName = groupName;
    this.group = group;
  }

  this.cuts = [];
};

Rdxport.Cart.prototype.addCut = function(cut) {
  this.cuts.push(cut);
};

Rdxport.Cart.prototype.removeCut = function(cut) {
  var self = this;
  $.each(this.cuts, function(index, currentCut){
    if(currentCut === cut) {
      self.cuts.splice(index, 1);
    }
  });
};

Rdxport.Cut = function(name, description, cart, length, originDatetime,
                         playCounter, lastPlayDatetime) {
  this.xml = null;

  if (arguments.length === 2) {
    this.xml = arguments[0];
    this.name = $('cutName', this.xml).text();
    this.description = $('description', this.xml).text();
    this.length = $('length', this.xml).text();
    this.originDatetime = $('originDatetime', this.xml).text();
    this.playCounter = $('playCounter', this.xml).text();
    this.lastPlayDatetime = $('lastPlayDatetime', this.xml).text();
    this.cart = arguments[1];
  } else {
    this.name = name;
    this.description = description;
    this.cart = cart;
    this.length = length;
    this.originDatetime = originDatetime;
    this.playCounter = playCounter;
    this.lastPlayDatetime = lastPlayDatetime;
  }
  this.number = this.name.substr(-3);
  this.cartNumber = this.cart.number;
};
