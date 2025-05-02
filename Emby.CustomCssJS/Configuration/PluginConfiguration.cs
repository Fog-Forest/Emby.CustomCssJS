using MediaBrowser.Model.Plugins;

namespace Emby.CustomCssJS.Configuration

{
    public class PluginConfiguration : BasePluginConfiguration

    {
        public PluginConfiguration()

        {
            customjs = new Custom[] { };
            customcss = new Custom[] { };
        }

        public Custom[] customjs { get; set; }
        public Custom[] customcss { get; set; }


        public class Custom

        {
            public string name { get; set; }
            public string description { get; set; }
            public string content { get; set; }
            public string date { get; set; }
            public string state { get; set; }
        }
    }
}