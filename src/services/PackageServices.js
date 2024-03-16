import { Package } from "../models/Package.js";
import { Feature } from "../models/Feature.js";
import { User } from "../models/User.js";
import NotificationService from "./NotificationServices.js";

class PackageService {
  async freeTrialPackage(freeTrialPackage) {
    try {
      const packageResponse = await this.addPackage(freeTrialPackage);
      const freeTrialFeatureCounts = {
        userId: freeTrialPackage.userId,
        packageId: packageResponse._id,
        isWatermark: false,
        countSave: 20,
        countDownload: 5,
        countAds: 0,
        countPostPrivate: 0,
      };
      const featureResponse = await this.addFeature(freeTrialFeatureCounts);
      await NotificationService.sendFreePackageNotification(
        featureResponse.userId
      );
    } catch (error) {
      throw error;
    }
  }

  async addPackage(packageData) {
    try {
      const existingPackage = await Package.findOne({
        name: packageData.name,
        price: packageData.price,
      });

      if (existingPackage) {
        await User.findByIdAndUpdate(packageData.userId, {
          packageId: existingPackage._id,
        });
        return existingPackage;
      } else {
        const newPackage = {
          name: packageData.name,
          price: packageData.price,
        };

        const addPackage = new Package(newPackage);
        await User.findByIdAndUpdate(packageData.userId, {
          packageId: addPackage._id,
        });
        await addPackage.save();
        return addPackage;
      }
    } catch (error) {
      throw error;
    }
  }

  async addFeature(featureData) {
    try {
      const newFeature = new Feature(featureData);
      await User.findByIdAndUpdate(featureData.userId, {
        type: "Partnership",
      });
      await newFeature.save();
      return newFeature;
    } catch (error) {
      throw error;
    }
  }

  async getPackageName(id) {
    try {
      const packageResult = await Package.findById(id);
      return packageResult.name;
    } catch (error) {
      throw error;
    }
  }

  async getFeatureByUserId(userId) {
    try {
      const featureResponse = await Feature.findOne({ userId: userId });
      return featureResponse;
    } catch (error) {
      throw error;
    }
  }

  async decreaseDownloadCount(userId, packageId) {
    try {
      const feature = await Feature.findOne({ userId, packageId });
      if (!feature) {
        throw new Error("Feature not found");
      }
      if (feature.countDownload > 0) {
        feature.countDownload -= 1;
      }
      await feature.save();
      return feature;
    } catch (error) {
      throw error;
    }
  }
}

export default new PackageService();
