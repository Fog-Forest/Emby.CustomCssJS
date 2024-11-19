using System.Collections.Generic;
using Emby.Features;

namespace Emby.CustomCssJS
{
    internal class CustomCssJSFeature : IFeatureFactory
    {
        public const string StaticId = "customcssjs";

        public List<FeatureInfo> GetFeatureInfos(string language)
        {
            return new List<FeatureInfo>
            {
                new FeatureInfo
                {
                    Id = "customcssjs",
                    Name = "Custom Css and JavaScript",
                    FeatureType = (FeatureType)1
                }
            };
        }
    }
}