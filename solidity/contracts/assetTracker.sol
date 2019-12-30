pragma solidity ^0.5.0;


contract assetTracker {
 
    struct asset {
        bytes32 assetID;
        bytes32 ownerID;
        bytes32 assetName;
        uint price;
        bytes32[] allOwners;
        bytes32[] history;
        bytes32[] activityHistory;
        
    }

    struct assetMaintenance {
        bytes32[] maintenanceDescription;
        bytes32[]   maintenanceDates;
        bytes32[] maintainers;
    }
    
    mapping(bytes32=>asset) idAssetMap;
    mapping(bytes32=>assetMaintenance) assetMaintenanceMap;

    event addedAsset(bytes32 assetId,bytes32 ownerId, uint assetPrice);
    event ownerShipChange(bytes32 assetId, bytes32 owner, bytes32 dates);
    event maintenance(bytes32 assetId,bytes32 maintenanceDesc, bytes32 maintainer, bytes32 date);

    function setAssetData(bytes32  userId,bytes32  Assetid,bytes32 activityDate,bytes32 presentAct,uint assetPrice,bytes32 aName) 
    public returns(bool){

        idAssetMap[Assetid].ownerID = userId;
        idAssetMap[Assetid].assetID = Assetid;
        idAssetMap[Assetid].price = assetPrice;
        idAssetMap[Assetid].assetName = aName;
        idAssetMap[Assetid].history.push(activityDate);
        idAssetMap[Assetid].activityHistory.push(presentAct);
        idAssetMap[Assetid].allOwners.push(userId);
        emit addedAsset(Assetid,userId,assetPrice);
        return true;
    }

    function getAssetData(bytes32 Assetid) public view returns(bytes32[] memory owner,
    bytes32[] memory  assetHistory,bytes32[] memory activityHistory){
  
        owner = idAssetMap[Assetid].allOwners;
        assetHistory = idAssetMap[Assetid].history;
        activityHistory = idAssetMap[Assetid].activityHistory;
    }

    function ownershipChange(bytes32 Assetid, bytes32 newOwnerid, bytes32 date) public{
        
        idAssetMap[Assetid].ownerID = newOwnerid;
        idAssetMap[Assetid].allOwners.push(newOwnerid);
        idAssetMap[Assetid].history.push(date);
        idAssetMap[Assetid].activityHistory.push("oc");
        emit ownerShipChange(Assetid,newOwnerid,date);
    }

    function service(bytes32 Assetid,bytes32 maintenanceInfo, bytes32 date) public{
        assetMaintenanceMap[Assetid].maintenanceDescription.push(maintenanceInfo);
        assetMaintenanceMap[Assetid].maintenanceDates.push(date);
        assetMaintenanceMap[Assetid].maintainers.push(idAssetMap[Assetid].ownerID);
        emit maintenance(Assetid,maintenanceInfo,idAssetMap[Assetid].ownerID,date);
    }

    function maintenanceHistory(bytes32 AssetId) public view returns(bytes32[] memory desc, bytes32[] memory dates, bytes32[] memory owners )   {
        desc = assetMaintenanceMap[AssetId].maintenanceDescription;
        dates = assetMaintenanceMap[AssetId].maintenanceDates;
        owners = assetMaintenanceMap[AssetId].maintainers;

    }
  

}
