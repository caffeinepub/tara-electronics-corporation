import Array "mo:core/Array";
import Iter "mo:core/Iter";
import List "mo:core/List";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Time "mo:core/Time";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  module ProductCategory {
    public func toText(category : ProductCategory) : Text {
      switch (category) {
        case (#consumerElectronics) { "Consumer Electronics" };
        case (#laserEngraving) { "Laser Engraving" };
        case (#threeDPrinting) { "3D Printing" };
        case (#customisation) { "Customisation" };
      };
    };

    public func compare(cat1 : ProductCategory, cat2 : ProductCategory) : Order.Order {
      toText(cat1).compare(toText(cat2));
    };
  };

  type ProductCategory = {
    #consumerElectronics;
    #laserEngraving;
    #threeDPrinting;
    #customisation;
  };

  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    priceInInr : Nat;
    imageUrl : Text;
    category : ProductCategory;
  };

  type OrderItem = {
    productId : Nat;
    quantity : Nat;
  };

  type CustomerInfo = {
    name : Text;
    phone : Text;
    address : Text;
  };

  type Order = {
    id : Nat;
    items : [OrderItem];
    customerInfo : CustomerInfo;
    timestamp : Time.Time;
  };

  type Enquiry = {
    id : Nat;
    name : Text;
    phone : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  public type UserProfile = {
    name : Text;
    phone : Text;
    address : Text;
  };

  // State
  let products = Map.empty<Nat, Product>();
  let orders = Map.empty<Nat, Order>();
  let enquiries = Map.empty<Nat, Enquiry>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  var nextProductId = 1;
  var nextOrderId = 1;
  var nextEnquiryId = 1;

  // Authorization state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Initialize sample products (seed data)
  public shared ({ caller }) func initSampleProducts() : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can initialize sample products");
    };

    let sampleProducts = [
      // Consumer Electronics
      {
        id = nextProductId;
        name = "LED Strip Lights";
        description = "RGB LED strip lights for home decor.";
        priceInInr = 1200;
        imageUrl = "https://tara-electronics.ic0.app/assets/led-strip-lights.jpg";
        category = #consumerElectronics;
      },
      {
        id = nextProductId + 1;
        name = "Bluetooth Speaker";
        description = "Portable Bluetooth speaker with bass boost.";
        priceInInr = 2500;
        imageUrl = "https://tara-electronics.ic0.app/assets/bluetooth-speaker.jpg";
        category = #consumerElectronics;
      },
      {
        id = nextProductId + 2;
        name = "Wireless Mouse";
        description = "Ergonomic wireless mouse with adjustable DPI.";
        priceInInr = 800;
        imageUrl = "https://tara-electronics.ic0.app/assets/wireless-mouse.jpg";
        category = #consumerElectronics;
      },
      // Laser Engraving
      {
        id = nextProductId + 3;
        name = "Custom Wooden Plaque";
        description = "Laser engraved wooden plaque for personalization.";
        priceInInr = 1500;
        imageUrl = "https://tara-electronics.ic0.app/assets/wooden-plaque.jpg";
        category = #laserEngraving;
      },
      {
        id = nextProductId + 4;
        name = "Engraved Keychain";
        description = "Personalized keychain with name or logo engraving.";
        priceInInr = 300;
        imageUrl = "https://tara-electronics.ic0.app/assets/engraved-keychain.jpg";
        category = #laserEngraving;
      },
      // 3D Printing
      {
        id = nextProductId + 5;
        name = "3D Printed Figurine";
        description = "Customizable 3D printed figurine in various sizes.";
        priceInInr = 2000;
        imageUrl = "https://tara-electronics.ic0.app/assets/3d-printed-figurine.jpg";
        category = #threeDPrinting;
      },
      {
        id = nextProductId + 6;
        name = "Spare Part Printing";
        description = "3D printing service for custom spare parts.";
        priceInInr = 500;
        imageUrl = "https://tara-electronics.ic0.app/assets/spare-part-printing.jpg";
        category = #threeDPrinting;
      },
      // Customisation
      {
        id = nextProductId + 7;
        name = "Personalized T-Shirt";
        description = "Custom t-shirt with your own design or text.";
        priceInInr = 700;
        imageUrl = "https://tara-electronics.ic0.app/assets/personalized-tshirt.jpg";
        category = #customisation;
      },
    ];

    for (product in sampleProducts.values()) {
      products.add(product.id, product);
    };

    nextProductId += sampleProducts.size();
  };

  // Place Order (requires authenticated user)
  public shared ({ caller }) func placeOrder(items : [OrderItem], customerInfo : CustomerInfo) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can place orders");
    };

    let orderId = nextOrderId;
    let order : Order = {
      id = orderId;
      items;
      customerInfo;
      timestamp = Time.now();
    };

    orders.add(orderId, order);
    nextOrderId += 1;
    orderId;
  };

  // Submit Enquiry (open to all including guests)
  public shared ({ caller }) func submitEnquiry(name : Text, phone : Text, email : Text, message : Text) : async Nat {
    let enquiryId = nextEnquiryId;
    let enquiry : Enquiry = {
      id = enquiryId;
      name;
      phone;
      email;
      message;
      timestamp = Time.now();
    };

    enquiries.add(enquiryId, enquiry);
    nextEnquiryId += 1;
    enquiryId;
  };

  // Get All Categories (public read)
  public query ({ caller }) func getAllCategories() : async [ProductCategory] {
    [#consumerElectronics, #laserEngraving, #threeDPrinting, #customisation];
  };

  // Get Products by Category (public read)
  public query ({ caller }) func getProductsByCategory(category : ProductCategory) : async [Product] {
    products.values().toArray().filter(
      func(p) {
        p.category == category;
      }
    );
  };

  // Get Product by ID (public read)
  public query ({ caller }) func getProductById(id : Nat) : async ?Product {
    products.get(id);
  };

  // Get All Orders (admin only)
  public query ({ caller }) func getAllOrders() : async [Order] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all orders");
    };
    orders.values().toArray();
  };

  // Get All Enquiries (admin only)
  public query ({ caller }) func getAllEnquiries() : async [Enquiry] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all enquiries");
    };
    enquiries.values().toArray();
  };

  // Add Product (admin only)
  public shared ({ caller }) func addProduct(name : Text, description : Text, priceInInr : Nat, imageUrl : Text, category : ProductCategory) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };

    let productId = nextProductId;
    let product : Product = {
      id = productId;
      name;
      description;
      priceInInr;
      imageUrl;
      category;
    };

    products.add(productId, product);
    nextProductId += 1;
    productId;
  };
};
