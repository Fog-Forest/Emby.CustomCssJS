using Emby.CustomCssJS.Configuration;
using MediaBrowser.Controller.Net;
using MediaBrowser.Model.Services;

namespace Emby.CustomCssJS.Api
{
    [Route("/CustomCssJS/Scripts", "GET", Summary = "Gets CustomCssJS Scripts")]
    [Authenticated(FeatureIds = new[] { "customcssjs" })]
    public class GetCustomCssJSscripts : IReturn<PluginConfiguration>

    {
    }

    public class CustomCssJSApi : IService, IRequiresRequest
    {
        private readonly IHttpResultFactory _resultFactory;

        public CustomCssJSApi(IHttpResultFactory resultFactory)
        {
            _resultFactory = resultFactory;
        }

        public IRequest Request { get; set; }

        public object GET(GetCustomCssJSscripts request)
        {
            return Plugin.Instance.Configuration;
        }
    }
}